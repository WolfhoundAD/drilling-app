import type { FC } from 'react';
import { useMemo } from 'react';
import * as THREE from 'three';

const MATERIAL_COLORS: Record<string, string> = {
  hss:     '#7f8a99',
  hssco:   '#8a94a2',
  carbide: '#4d5766',
  coated:  '#d4b445',
};

interface Props { diameter: number; type?: string; material?: string }

export const DrillModel: FC<Props> = ({ diameter, type = 'twist', material }) => {
  const r = 0.18 + Math.min(diameter, 40) / 100; // 0.18–0.58
  const bodyLength = 2.2;
  const shankLength = 0.7;
  const tipLength = Math.max(r * 2.4, 0.4);
  const color = MATERIAL_COLORS[material ?? ''] ?? MATERIAL_COLORS.hss;

  /* ---------- плоское ---------- */
  if (type === 'flat') {
    return (
      <group>
        <mesh position={[0, tipLength + bodyLength / 2, 0]} castShadow>
          <boxGeometry args={[r * 2.2, bodyLength, r * 0.5]} />
          <meshStandardMaterial color={color} metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, tipLength / 2, 0]} castShadow>
          <cylinderGeometry args={[r * 0.55, 0, tipLength, 4]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, tipLength + bodyLength + shankLength / 2, 0]} castShadow>
          <cylinderGeometry args={[r * 0.55, r * 0.55, shankLength, 24]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  /* ---------- кольцевое ---------- */
  if (type === 'core') {
    return (
      <group>
        <mesh position={[0, tipLength / 2, 0]} castShadow>
          <cylinderGeometry args={[r, r, tipLength, 32]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, tipLength + bodyLength / 2, 0]} castShadow>
          <cylinderGeometry args={[r, r, bodyLength, 32, 1, true]} />
          <meshStandardMaterial
            color={color} metalness={0.9} roughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, tipLength + bodyLength / 2, 0]}>
          <cylinderGeometry args={[r * 0.82, r * 0.82, bodyLength, 32, 1, true]} />
          <meshStandardMaterial color="#1c2331" side={THREE.BackSide} />
        </mesh>
        <mesh position={[0, tipLength + bodyLength + shankLength / 2, 0]} castShadow>
          <cylinderGeometry args={[r * 0.7, r * 0.7, shankLength, 24]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  /* ---------- спиральное (по умолчанию) ---------- */
  return (
    <group>
      {/* конус-остриё: apex в y=0, base в y=tipLength */}
      <mesh position={[0, tipLength / 2, 0]} castShadow>
        <cylinderGeometry args={[r, 0, tipLength, 32]} />
        <meshStandardMaterial color={color} metalness={0.92} roughness={0.22} />
      </mesh>
      {/* тело */}
      <mesh position={[0, tipLength + bodyLength / 2, 0]} castShadow>
        <cylinderGeometry args={[r, r, bodyLength, 32]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.3} />
      </mesh>
      {/* две винтовые канавки — тёмные спиральные трубки */}
      <HelixFlute radius={r * 1.005} start={tipLength} length={bodyLength} turns={4} phase={0} />
      <HelixFlute radius={r * 1.005} start={tipLength} length={bodyLength} turns={4} phase={Math.PI} />
      {/* хвостовик */}
      <mesh position={[0, tipLength + bodyLength + shankLength / 2, 0]} castShadow>
        <cylinderGeometry args={[r * 0.85, r * 0.85, shankLength, 24]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

/* Винтовая канавка — TubeGeometry по спирали */
const HelixFlute: FC<{
  radius: number; start: number; length: number; turns: number; phase: number;
}> = ({ radius, start, length, turns, phase }) => {
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const seg = 140;
    for (let i = 0; i <= seg; i++) {
      const t = i / seg;
      const a = t * turns * Math.PI * 2 + phase;
      pts.push(new THREE.Vector3(
        Math.cos(a) * radius,
        start + t * length,
        Math.sin(a) * radius,
      ));
    }
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(pts), 140, radius * 0.16, 6, false,
    );
  }, [radius, start, length, turns, phase]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#2d3543" roughness={0.8} metalness={0.25} />
    </mesh>
  );
};