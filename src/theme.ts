import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#2563eb', light: '#60a5fa', dark: '#1d4ed8' },
    secondary: { main: '#7c3aed' },
    success:   { main: '#16a34a' },
    warning:   { main: '#f59e0b' },
    error:     { main: '#dc2626' },
    background:{ default: '#f1f5f9', paper: '#ffffff' },
    text:      { primary: '#0f172a', secondary: '#64748b' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700, letterSpacing: -0.5 },
    h6: { fontWeight: 700, letterSpacing: -0.3 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#f1f5f9' },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          '&:before': { display: 'none' },
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
          transition: 'box-shadow .2s, transform .2s',
          '&:hover': { boxShadow: '0 4px 12px rgba(15,23,42,0.08)' },
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiTextField:      { defaultProps: { size: 'small', fullWidth: true } },
    MuiAutocomplete:   { defaultProps: { size: 'small' } },
    MuiOutlinedInput:  {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#fff',
          '& fieldset':         { borderColor: '#e2e8f0' },
          '&:hover fieldset':   { borderColor: '#cbd5e1' },
          '&.Mui-focused fieldset': { borderWidth: 2 },
        },
      },
    },
    MuiButton: { styleOverrides: { root: { borderRadius: 10, paddingInline: 18 } } },
    MuiAlert:  { styleOverrides: { root: { borderRadius: 12 } } },
  },
});