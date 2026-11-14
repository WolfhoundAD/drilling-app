# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Сначала только манифесты — чтобы кэш зависимостей не сбрасывался при правках кода
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Затем исходники
COPY . .

# Переменные CRA должны быть доступны на этапе СБОРКИ (они встраиваются в бандл)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn build

# ============================================
# Stage 2: Serve
# ============================================
FROM nginx:1.27-alpine AS production

# Кастомный конфиг для SPA (history API / react-router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]