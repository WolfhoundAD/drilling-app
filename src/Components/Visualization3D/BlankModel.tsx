import type { FC } from 'react';
import * as THREE from 'three';

interface Props {
  diameter: number; thickness: number;
  holeDiameter: number; holeDepth: number;
  isThrough: boolean;
}

export const BlankModel: FC<Props> = ({
  diameter, thickness, holeDiameter, holeDepth, isThrough,
}) => {
  const R = 0.8 + Math.min(diameter, 100) / 120;       // 0.8–1.6
  const rHole = 0.05 + Math.min(holeDiameter, 40) / 80; // 0.05–0.55
  const H = 0.4 + Math.min(thickness, 100) / 100;       // 0.4–1.4
  const holeH = isThrough ? H : Math.min(0.02 + holeDepth / 100, H);

  return (
    <group>
      {/* внешняя стенка */}
      <mesh position={[0, -H / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[R, R, H, 32, 1, true]} />
        <meshStandardMaterial
          color="#9aa3af" metalness={0.55} roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* верхнее кольцо (с отверстием) */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[rHole, R, 48]} />
        <meshStandardMaterial
          color="#b7bec9" metalness={0.55} roughness={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* стенка отверстия */}
      <mesh position={[0, -holeH / 2, 0]}>
        <cylinderGeometry args={[rHole, rHole, holeH, 32, 1, true]} />
        <meshStandardMaterial color="#1a2230" side={THREE.BackSide} />
      </mesh>
      {/* дно глухого отверстия */}
      {!isThrough && (
        <mesh position={[0, -holeH, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[rHole, 32]} />
          <meshStandardMaterial color="#1a2230" side={THREE.DoubleSide} />
        </mesh>
      )}
      {/* нижнее кольцо / дно заготовки */}
      <mesh position={[0, -H, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        {isThrough ? (
          <ringGeometry args={[rHole, R, 48]} />
        ) : (
          <circleGeometry args={[R, 48]} />
        )}
        <meshStandardMaterial
          color="#9aa3af" metalness={0.55} roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};