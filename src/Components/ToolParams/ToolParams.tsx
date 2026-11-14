import type { FC } from 'react';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';
import Card from '../Card/Card';
import { drillTypes } from '../../Dictionaries/drillTypes';
import { toolMaterials } from '../../Dictionaries/toolMaterials';
import type { Option } from '../../types';

interface Props {
  type: Option | null; material: Option | null; diameter: number;
  onType: (v: Option | null) => void;
  onMaterial: (v: Option | null) => void;
  onDiameter: (v: number) => void;
}

const ToolParams: FC<Props> = (p) => (
  <Card title="Параметры сверла" icon={<HandymanIcon fontSize="small" />} accent="#7c3aed">
    <Autocomplete
      disablePortal options={drillTypes} value={p.type}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => p.onType(v)}
      renderInput={(x) => <TextField {...x} label="Тип сверла" />}
    />
    <Autocomplete
      disablePortal options={toolMaterials} value={p.material}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => p.onMaterial(v)}
      renderInput={(x) => <TextField {...x} label="Материал режущей части" />}
    />
    <TextField
      label="Диаметр сверла"
      type="number"
      value={p.diameter || ''}
      inputProps={{ min: 0, step: 0.1 }}
      InputProps={{ endAdornment: <InputAdornment position="end">мм</InputAdornment> }}
      onKeyDown={(e) => e.key === '-' && e.preventDefault()}
      onChange={(e) => p.onDiameter(Math.max(0, Number(e.target.value)))}
    />
  </Card>
);
export default ToolParams;