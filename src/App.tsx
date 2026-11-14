import { useRef, useState, type ChangeEvent } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import { theme } from './theme';
import type { State } from './types';

const initial: State = {
  material: null, machine: null, drillType: null, toolMaterial: null,
  diameter: 0, depth: 0, holeType: null,
};

function App() {
  const [state, setState] = useState<State>(initial);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'drilling-calc.json';
    a.click();
  };

const open = (e: ChangeEvent<HTMLInputElement>) => {
  const f = e.target.files?.[0];
  if (!f) return;
  f.text().then((t) => setState(JSON.parse(t)));
  e.target.value = '';
};

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', pb: 4 }}>
        <Header onOpen={() => fileRef.current?.click()} onSave={save} />
        <input ref={fileRef} type="file" accept=".json" hidden onChange={open} />
        <Content state={state} setState={setState} />
      </Box>
    </ThemeProvider>
  );
}
export default App;