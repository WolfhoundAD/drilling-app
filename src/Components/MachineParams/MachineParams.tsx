import type { FC } from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import Card from '../Card/Card';
import { machines } from '../../Dictionaries/machines';
import type { Machine } from '../../types';

interface Props { value: Machine | null; onChange: (v: Machine | null) => void }

const MachineParams: FC<Props> = ({ value, onChange }) => (
  <Card title="Параметры станка" icon={<PrecisionManufacturingIcon fontSize="small" />} accent="#2563eb">
    <Autocomplete
      disablePortal
      options={machines}
      value={value}
      getOptionLabel={(o) => o.label}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => onChange(v)}
      renderInput={(p) => <TextField {...p} label="Станок" />}
    />
    {value && (
      <Box
        sx={{
          display: 'flex', gap: 2, p: 1.5, borderRadius: 2,
          bgcolor: '#eff6ff', border: '1px solid #dbeafe',
        }}
      >
        <Typography variant="body2">
          <b>Мощность:</b> {value.power} кВт
        </Typography>
        <Typography variant="body2">
          <b>Макс. обороты:</b> {value.maxRpm} об/мин
        </Typography>
      </Box>
    )}
  </Card>
);
export default MachineParams;