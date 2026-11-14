import type { FC } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

interface Props { onOpen: () => void; onSave: () => void }

const Header: FC<Props> = ({ onOpen, onSave }) => (
  <AppBar
    position="sticky"
    elevation={0}
    sx={{
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #7c3aed 100%)',
      borderBottom: '1px solid rgba(255,255,255,.15)',
    }}
  >
    <Toolbar sx={{ gap: 2 }}>
      <PrecisionManufacturingIcon />
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: -0.3 }}>
        Подбор режущего инструмента при сверлении
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<FolderOpenIcon />}
          onClick={onOpen}
          sx={{ borderColor: 'rgba(255,255,255,.35)', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,.08)' } }}
        >
          Открыть
        </Button>
        <Button
          color="inherit"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
          sx={{ bgcolor: 'rgba(255,255,255,.18)', boxShadow: 'none', '&:hover': { bgcolor: 'rgba(255,255,255,.28)' } }}
        >
          Сохранить
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);
export default Header;