import type { FC } from 'react';
import { Alert, Box, Stack, Typography } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Card from '../Card/Card';
import type { Result as R } from '../../calc';

const Stat: FC<{ label: string; value: string; unit: string; color: string }> = ({ label, value, unit, color }) => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: 2,
      bgcolor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderLeft: `3px solid ${color}`,
    }}
  >
    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
      {label}
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.15, mt: 0.25 }}>
      {value}{' '}
      <Typography component="span" variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {unit}
      </Typography>
    </Typography>
  </Box>
);

const Result: FC<{ result: R | null }> = ({ result }) => (
  <Card title="Результат подбора" icon={<InsightsIcon fontSize="small" />} accent="#16a34a">
    {!result ? (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <InfoOutlinedIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">Заполните все параметры, чтобы увидеть расчёт.</Typography>
      </Box>
    ) : (
      <Stack spacing={2}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
            border: '1px solid #bfdbfe',
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}
          >
            Рекомендуемый инструмент
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark', mt: 0.25 }}>
            {result.recommended}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.25 }}>
          <Stat label="Частота вращения"  value={result.rpm.toFixed(0)}    unit="об/мин" color="#2563eb" />
          <Stat label="Скорость резания"  value={result.speed.toFixed(1)}  unit="м/мин"  color="#7c3aed" />
          <Stat label="Подача"            value={result.feed.toFixed(3)}   unit="мм/об"  color="#0ea5e9" />
          <Stat label="Крутящий момент"   value={result.torque.toFixed(2)} unit="Н·м"    color="#f59e0b" />
          <Stat label="Мощность резания"  value={result.power.toFixed(2)}  unit="кВт"    color="#ef4444" />
          <Stat label="Машинное время"    value={result.time.toFixed(2)}   unit="мин"    color="#16a34a" />
        </Box>

        {result.warnings.map((w) => (
          <Alert key={w} severity="warning">{w}</Alert>
        ))}
      </Stack>
    )}
  </Card>
);
export default Result;