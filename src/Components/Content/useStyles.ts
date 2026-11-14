export const styles = {
  root: {
    display: 'grid',
    gap: 2,
    p: { xs: 2, md: 3 },
    maxWidth: 1440,
    mx: 'auto',
    alignItems: 'flex-start',
    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  },
  column: { display: 'flex', flexDirection: 'column', gap: 2 },
} as const;