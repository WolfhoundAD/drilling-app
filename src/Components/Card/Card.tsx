import { FC, ReactNode } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props { 
  title: string; 
  children: ReactNode; 
}

const Card: FC<Props> = ({ title, children }) => (
  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {children}
    </AccordionDetails>
  </Accordion>
);

export default Card;