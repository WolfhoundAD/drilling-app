import type { FC } from 'react';
import { Box } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import Card from '../Card/Card';
import Tool from '../../icons/Tool';

const ToolImage: FC = () => (
  <Card title="Пример режущего инструмента" icon={<PrecisionManufacturingIcon fontSize="small" />} accent="#7c3aed">
    <Box
      sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        p: 2, minHeight: 220, borderRadius: 2,
        background: 'radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      <Tool width={280} height={280} />
    </Box>
  </Card>
);
export default ToolImage;