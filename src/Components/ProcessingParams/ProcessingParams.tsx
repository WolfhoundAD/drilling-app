import { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Card from '../Card/Card';
import { holeTypes } from '../../Dictionaries/holeTypes';
import { Option } from '../../types';

interface Props {
  holeType: Option | null; depth: number;
  onHoleType: (v: Option | null) => void;
  onDepth: (v: number) => void;
}

const ProcessingParams: FC<Props> = (p) => (
  <Card title="Параметры обработки">
    <Autocomplete disablePortal options={holeTypes} value={p.holeType}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => p.onHoleType(v)}
      renderInput={(x) => <TextField {...x} label="Тип отверстия" />} />
    <TextField label="Глубина отверстия, мм" type="number"
      value={p.depth || ''}
      inputProps={{ min: 0 }}
      onKeyDown={(e) => e.key === '-' && e.preventDefault()}
      onChange={(e) => p.onDepth(Math.max(0, Number(e.target.value)))} />
  </Card>
);
export default ProcessingParams;