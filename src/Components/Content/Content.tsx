import type { FC } from 'react';
import { Box } from '@mui/material';
import BlankParams from '../BlankParams/BlankParams';
import MachineParams from '../MachineParams/MachineParams';
import ToolParams from '../ToolParams/ToolParams';
import Visualization3D from '../Visualization3D/Visualization3D';
import ProcessingParams from '../ProcessingParams/ProcessingParams';
import Result from '../Result/Result';
import SmartAdvice from '../SmartAdvice/SmartAdvice';
import { styles } from './useStyles';
import type { State } from '../../types';
import { calculate } from '../../calc';

interface Props {
  state: State;
  setState: (s: State) => void;
}

const Content: FC<Props> = ({ state: s, setState }) => {
  const set = (p: Partial<State>) => setState({ ...s, ...p });
  const result = calculate(s);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.column}>
        <BlankParams value={s.material} onChange={(material) => set({ material })} />
        <MachineParams value={s.machine} onChange={(machine) => set({ machine })} />
        <ToolParams
          type={s.drillType}
          material={s.toolMaterial}
          diameter={s.diameter}
          onType={(drillType) => set({ drillType })}
          onMaterial={(toolMaterial) => set({ toolMaterial })}
          onDiameter={(diameter) => set({ diameter })}
        />
      </Box>

      <Box sx={styles.column}>
        <Visualization3D state={s} />
        <ProcessingParams
          holeType={s.holeType}
          depth={s.depth}
          onHoleType={(holeType) => set({ holeType })}
          onDepth={(depth) => set({ depth })}
        />
      </Box>

      <Box sx={styles.column}>
        <Result result={result} />
        <SmartAdvice state={s} result={result} />
      </Box>
    </Box>
  );
};

export default Content;