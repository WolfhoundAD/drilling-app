import type { FC } from 'react';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import Card from '../Card/Card';
import { holeTypes } from '../../Dictionaries/holeTypes';
import type { Option } from '../../types';

interface Props {
  holeType: Option | null; depth: number;
  onHoleType: (v: Option | null) => void;
  onDepth: (v: number) => void;
}

const ProcessingParams: FC<Props> = (p) => (
  <Card title="Параметры обработки" icon={<SettingsIcon fontSize="small" />} accent="#f59e0b">
    <Autocomplete
      disablePortal options={holeTypes} value={p.holeType}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => p.onHoleType(v)}
      renderInput={(x) => <TextField {...x} label="Тип отверстия" />}
    />
    <TextField
      label="Глубина отверстия"
      type="number"
      value={p.depth || ''}
      inputProps={{ min: 0 }}
      InputProps={{ endAdornment: <InputAdornment position="end">мм</InputAdornment> }}
      onKeyDown={(e) => e.key === '-' && e.preventDefault()}
      onChange={(e) => p.onDepth(Math.max(0, Number(e.target.value)))}
    />
  </Card>
);
export default ProcessingParams;