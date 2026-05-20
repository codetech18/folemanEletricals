import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Arc = {
  points: THREE.Vector3[];
  delay: number;
  life: number;
  offset: number;
};

function createArc(seed: number): Arc {
  const points: THREE.Vector3[] = [];
  const lane = seed % 7;
  const startX = -10.5 - (seed % 4) * 0.55;
  const startY = -2.7 + lane * 0.88 + Math.sin(seed * 0.73) * 0.18;
  const length = 19 + (seed % 5) * 0.62;
  const segments = 18 + (seed % 7);

  for (let i = 0; i < segments; i += 1) {
    const progress = i / (segments - 1);
    const jitter = Math.sin(seed * 12.989 + i * 4.13) * 0.28;
    const kink = Math.sin(progress * Math.PI * (2.4 + (seed % 3)) + seed) * 0.42;
    points.push(
      new THREE.Vector3(
        startX + progress * length + jitter,
        startY + kink + Math.sin(seed + i * 1.7) * 0.06,
        -2.1 - (seed % 4) * 0.42,
      ),
    );
  }

  return {
    points,
    delay: (seed % 8) * 0.18,
    life: 1.2 + (seed % 5) * 0.18,
    offset: seed * 0.31,
  };
}

function ArcLines() {
  const segments = useMemo(() => {
    const arcs = Array.from({ length: 24 }, (_, index) => createArc(index + 3));

    return arcs.map((arc, index) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(arc.points);
      const material = new THREE.LineBasicMaterial({ color: '#FFD100', transparent: true, opacity: 0 });
      const line = new THREE.Line(geometry, material);

      const branchStart = arc.points[Math.min(arc.points.length - 2, 3 + (index % 5))];
      const branchGeometry = new THREE.BufferGeometry().setFromPoints([
        branchStart,
        new THREE.Vector3(branchStart.x + 0.48, branchStart.y + 0.38, branchStart.z),
        new THREE.Vector3(branchStart.x + 1.12, branchStart.y + 0.08, branchStart.z),
      ]);
      const branchMaterial = new THREE.LineBasicMaterial({ color: '#fff4a8', transparent: true, opacity: 0 });
      const branch = new THREE.Line(branchGeometry, branchMaterial);

      return { arc, line, branch };
    });
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    segments.forEach(({ arc, line, branch }, index) => {
      const pulse = ((elapsed + arc.delay) % arc.life) / arc.life;
      const intensity = Math.sin(pulse * Math.PI);
      line.material.opacity = Math.max(0, intensity * 0.72 - 0.05);
      line.scale.setScalar(0.98 + intensity * 0.025);
      line.position.x = Math.sin(elapsed * 0.2 + arc.offset) * 0.42;
      const branchPulse = ((elapsed + index * 0.23) % 1.8) / 1.8;
      branch.material.opacity = Math.sin(branchPulse * Math.PI) * 0.26;
    });
  });

  return (
    <group rotation={[0, 0, -0.045]}>
      {segments.map(({ arc, line, branch }) => (
        <group key={arc.offset}>
          <primitive object={line} />
          <primitive object={branch} />
        </group>
      ))}
    </group>
  );
}

export function ElectricArcs() {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 8], fov: 58 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 7, 15]} />
      <ArcLines />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.15} luminanceThreshold={0.1} luminanceSmoothing={0.42} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
