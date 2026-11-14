import type { FC, ReactNode } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  title: string;
  icon?: ReactNode;
  accent?: string;   // hex-цвет акцента
  children: ReactNode;
}

const Card: FC<Props> = ({ title, icon, accent = '#2563eb', children }) => (
  <Accordion defaultExpanded disableGutters>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, py: 0.5 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        {icon && (
          <Box
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 34, borderRadius: '10px',
              bgcolor: `${accent}1f`, color: accent,
            }}
          >
            {icon}
          </Box>
        )}
        <Typography sx={{ fontWeight: 700, letterSpacing: -0.2 }}>{title}</Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 2, pb: 2 }}>
      {children}
    </AccordionDetails>
  </Accordion>
);
export default Card;