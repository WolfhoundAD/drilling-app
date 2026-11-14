import type { FC } from 'react';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { DrillModel } from './DrillModel';
import { BlankModel } from './BlankModel';
import type { State } from '../../types';

const DRILL_LIFT = 0.55; // насколько сверло приподнято над заготовкой

export const Scene: FC<{ state: State }> = ({ state }) => {
  const drillRef = useRef<Group>(null);

  const drillDiameter = Math.max(state.diameter || 10, 1);
  const drillDepth = Math.max(state.depth || 15, 1);
  const blankDiameter = Math.max(drillDiameter * 3, 30);
  const blankThickness = Math.max(drillDepth + 10, drillDiameter * 2 + 10);

  useFrame((s, delta) => {
    if (!drillRef.current) return;
    drillRef.current.rotation.y += delta * 1.5;            // вращение
    const bob = Math.sin(s.clock.elapsedTime * 1.1) * 0.04; // лёгкое покачивание
    drillRef.current.position.y = DRILL_LIFT + bob;
  });

  return (
    <>
      <BlankModel
        diameter={blankDiameter}
        thickness={blankThickness}
        holeDiameter={drillDiameter}
        holeDepth={drillDepth}
        isThrough={state.holeType?.id === 'through'}
      />
      <group ref={drillRef} position={[0, DRILL_LIFT, 0]}>
        <DrillModel
          diameter={drillDiameter}
          type={state.drillType?.id}
          material={state.toolMaterial?.id}
        />
      </group>
    </>
  );
};