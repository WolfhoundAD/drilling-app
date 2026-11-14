import { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Card from '../Card/Card';
import { drillTypes } from '../../Dictionaries/drillTypes';
import { toolMaterials } from '../../Dictionaries/toolMaterials';
import { Option } from '../../types';

interface Props {
  type: Option | null; material: Option | null; diameter: number;
  onType: (v: Option | null) => void;
  onMaterial: (v: Option | null) => void;
  onDiameter: (v: number) => void;
}

const ToolParams: FC<Props> = (p) => (
  <Card title="Параметры сверла">
    <Autocomplete disablePortal options={drillTypes} value={p.type}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => p.onType(v)}
      renderInput={(x) => <TextField {...x} label="Тип сверла" />} />
    <Autocomplete disablePortal options={toolMaterials} value={p.material}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => p.onMaterial(v)}
      renderInput={(x) => <TextField {...x} label="Материал режущей части" />} />
    <TextField label="Диаметр сверла, мм" type="number"
      value={p.diameter || ''}
      inputProps={{ min: 0, step: 0.1 }}
      onKeyDown={(e) => e.key === '-' && e.preventDefault()}
      onChange={(e) => p.onDiameter(Math.max(0, Number(e.target.value)))} />
  </Card>
);
export default ToolParams;