import { FC } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import Card from '../Card/Card';
import { machines } from '../../Dictionaries/machines';
import { Machine } from '../../types';

interface Props { value: Machine | null; onChange: (v: Machine | null) => void }

const MachineParams: FC<Props> = ({ value, onChange }) => (
  <Card title="Параметры станка">
    <Autocomplete disablePortal options={machines} value={value}
      getOptionLabel={(o) => o.label}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => onChange(v)}
      renderInput={(p) => <TextField {...p} label="Станок" />} />
    {value && (
      <Typography variant="body2">
        Мощность: {value.power} кВт; макс. обороты: {value.maxRpm} об/мин
      </Typography>
    )}
  </Card>
);
export default MachineParams;