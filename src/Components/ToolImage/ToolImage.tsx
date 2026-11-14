import { FC } from 'react';
import { Box } from '@mui/material';
import Card from '../Card/Card';
import Tool from '../../icons/Tool';

const ToolImage: FC = () => (
  <Card title="Пример режущего инструмента">
    <Box display="flex" justifyContent="center"><Tool width={321} height={321} /></Box>
  </Card>
);
export default ToolImage;