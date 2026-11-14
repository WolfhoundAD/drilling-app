// Header/Header.tsx
import { FC } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { MenuItem } from './types';

const menuItems: MenuItem[] = [
  { id: 'open', title: 'Открыть расчет' },
  { id: 'save', title: 'Сохранить расчет' },
];

interface Props { onOpen: () => void; onSave: () => void }

const Header: FC<Props> = ({ onOpen, onSave }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Подбор режущего инструмента при сверлении
      </Typography>
      <Box>
        {menuItems.map((mi) => (
          <Button key={mi.id} color="inherit" onClick={mi.id === 'open' ? onOpen : onSave}>
            {mi.title}
          </Button>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
);
export default Header;