import { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Card from '../Card/Card';
import { blankMaterials } from '../../Dictionaries/blankMaterials';
import { BlankMaterial } from '../../types';

interface Props { value: BlankMaterial | null; onChange: (v: BlankMaterial | null) => void }

const BlankParams: FC<Props> = ({ value, onChange }) => (
  <Card title="Параметры заготовки">
    <Autocomplete disablePortal options={blankMaterials} value={value}
      getOptionLabel={(o) => o.label}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => onChange(v)}
      renderInput={(p) => <TextField {...p} label="Материал" />} />
  </Card>
);
export default BlankParams;