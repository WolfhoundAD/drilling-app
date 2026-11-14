import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Card from '../Card/Card';
import { Scene } from './Scene';
import type { State } from '../../types';

const Visualization3D: FC<{ state: State }> = ({ state }) => (
  <Card title="3D визуализация" icon={<ViewInArIcon fontSize="small" />} accent="#0ea5e9">
    <Box
      sx={{
        height: { xs: 260, md: 320 },
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: '#0b1220',
        position: 'relative',
        '& canvas': { display: 'block' },
      }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [4, 3.5, 5.5], fov: 45 }} shadows>
        <color attach="background" args={['#0b1220']} />
        <hemisphereLight args={['#dfe8ff', '#1e293b', 0.85]} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 3, -3]} intensity={0.4} color="#8ab4ff" />

        <Scene state={state} />

        <ContactShadows position={[0, -1.6, 0]} opacity={0.45} blur={2.5} scale={8} />
        <OrbitControls
          target={[0, 1, 0]}
          enablePan={false}
          minDistance={3.5}
          maxDistance={10}
          minPolarAngle={0.4}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>

      <Typography
        variant="caption"
        sx={{
          position: 'absolute', bottom: 8, right: 12,
          color: 'rgba(255,255,255,.55)', pointerEvents: 'none',
        }}
      >
        Мышь — вращение, колёсико — масштаб
      </Typography>
    </Box>
  </Card>
);

export default Visualization3D;