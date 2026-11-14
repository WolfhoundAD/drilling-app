import type { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import Card from '../Card/Card';
import { blankMaterials } from '../../Dictionaries/blankMaterials';
import type { BlankMaterial } from '../../types';

interface Props { value: BlankMaterial | null; onChange: (v: BlankMaterial | null) => void }

const BlankParams: FC<Props> = ({ value, onChange }) => (
  <Card title="Параметры заготовки" icon={<InventoryIcon fontSize="small" />} accent="#0ea5e9">
    <Autocomplete
      disablePortal
      options={blankMaterials}
      value={value}
      getOptionLabel={(o) => o.label}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      onChange={(_, v) => onChange(v)}
      renderInput={(p) => <TextField {...p} label="Материал" />}
    />
  </Card>
);
export default BlankParams;