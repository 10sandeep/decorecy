'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ProgressRef = { current: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * THREE.MathUtils.clamp(t, 0, 1);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp01(t: number) {
  return THREE.MathUtils.clamp(t, 0, 1);
}

function range(t: number, start: number, end: number) {
  if (end <= start) return t >= end ? 1 : 0;
  return clamp01((t - start) / (end - start));
}

function Floor({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = progress.current;
    const s = easeInOutCubic(range(p, 0.0, 0.12));
    ref.current.scale.setScalar(lerp(0.001, 1, s));
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = s;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[9, 9]} />
      <meshStandardMaterial color="#d8cdb8" roughness={0.85} transparent />
    </mesh>
  );
}

function Wall({
  progress,
  seg,
  args,
  position,
  rotation,
  color,
}: {
  progress: ProgressRef;
  seg: [number, number];
  args: [number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, seg[0], seg[1]));
    ref.current.scale.y = lerp(0.001, 1, t);
    ref.current.position.y = lerp(-2, position[1], t);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = t;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.95} transparent />
    </mesh>
  );
}

function Sofa({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, 0.3, 0.42));
    group.current.scale.setScalar(lerp(0.001, 1, t));
    group.current.position.y = lerp(-1, 0, t);
    group.current.visible = t > 0.01;
  });
  return (
    <group ref={group} position={[0, 0, 1.6]}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[2.6, 0.5, 0.95]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.8} />
      </mesh>
      <mesh position={[-1.05, 0.62, -0.35]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.7]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.8} />
      </mesh>
      <mesh position={[1.05, 0.62, -0.35]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.7]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.8} />
      </mesh>
      <mesh position={[-0.85, 0.62, -0.4]} castShadow>
        <boxGeometry args={[0.45, 0.5, 0.55]} />
        <meshStandardMaterial color="#a89580" roughness={0.85} />
      </mesh>
      <mesh position={[0.85, 0.62, -0.4]} castShadow>
        <boxGeometry args={[0.45, 0.5, 0.55]} />
        <meshStandardMaterial color="#a89580" roughness={0.85} />
      </mesh>
    </group>
  );
}

function CoffeeTable({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, 0.4, 0.5));
    ref.current.scale.setScalar(lerp(0.001, 1, t));
    ref.current.position.y = lerp(-1, 0, t);
    ref.current.visible = t > 0.01;
  });
  return (
    <group ref={ref} position={[0, 0, 0.5]}>
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[1.1, 0.08, 0.6]} />
        <meshStandardMaterial color="#3a2f28" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[-0.45, 0.18, -0.22]} castShadow>
        <boxGeometry args={[0.05, 0.36, 0.05]} />
        <meshStandardMaterial color="#2a221d" roughness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.18, -0.22]} castShadow>
        <boxGeometry args={[0.05, 0.36, 0.05]} />
        <meshStandardMaterial color="#2a221d" roughness={0.5} />
      </mesh>
      <mesh position={[-0.45, 0.18, 0.22]} castShadow>
        <boxGeometry args={[0.05, 0.36, 0.05]} />
        <meshStandardMaterial color="#2a221d" roughness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.18, 0.22]} castShadow>
        <boxGeometry args={[0.05, 0.36, 0.05]} />
        <meshStandardMaterial color="#2a221d" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Rug({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, 0.2, 0.3));
    const s = lerp(0.001, 1, t);
    ref.current.scale.set(s, 1, s);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = t;
    ref.current.visible = t > 0.01;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0.8]}>
      <planeGeometry args={[3.2, 2]} />
      <meshStandardMaterial color="#c9a37a" roughness={1} transparent />
    </mesh>
  );
}

function TVUnit({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, 0.48, 0.58));
    group.current.scale.setScalar(lerp(0.001, 1, t));
    group.current.position.y = lerp(-1, 0, t);
    group.current.visible = t > 0.01;
  });
  return (
    <group ref={group} position={[0, 0, -2.1]}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[3.2, 0.06, 0.4]} />
        <meshStandardMaterial color="#4a3d33" roughness={0.6} />
      </mesh>
      <mesh position={[-1.4, 0.45, 0]} castShadow>
        <boxGeometry args={[0.4, 0.9, 0.38]} />
        <meshStandardMaterial color="#3a2f28" roughness={0.6} />
      </mesh>
      <mesh position={[1.4, 0.45, 0]} castShadow>
        <boxGeometry args={[0.4, 0.9, 0.38]} />
        <meshStandardMaterial color="#3a2f28" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.5, 0.02]} castShadow>
        <boxGeometry args={[1.7, 0.95, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.5, 0.06]}>
        <planeGeometry args={[1.55, 0.82]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

function PendantLight({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!group.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, 0.55, 0.65));
    group.current.scale.setScalar(lerp(0.001, 1, t));
    group.current.visible = t > 0.01;
    if (light.current) light.current.intensity = t * 1.5;
  });
  return (
    <group ref={group} position={[0, 3.2, 0.5]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <coneGeometry args={[0.22, 0.3, 24, 1, true]} />
        <meshStandardMaterial
          color="#e8d5b0"
          roughness={0.4}
          side={THREE.DoubleSide}
          emissive="#ffd9a0"
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight ref={light} position={[0, -0.15, 0]} color="#ffd9a0" distance={6} decay={2} />
    </group>
  );
}

function Plant({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, 0.6, 0.7));
    group.current.scale.setScalar(lerp(0.001, 1, t));
    group.current.position.y = lerp(-1, 0, t);
    group.current.visible = t > 0.01;
  });
  return (
    <group ref={group} position={[2.6, 0, -1.4]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.4, 16]} />
        <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color="#4a6b3a" roughness={1} />
      </mesh>
      <mesh position={[0.12, 0.7, 0.05]} castShadow>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#5a7b4a" roughness={1} />
      </mesh>
      <mesh position={[-0.1, 0.75, -0.08]} castShadow>
        <sphereGeometry args={[0.15, 10, 10]} />
        <meshStandardMaterial color="#3e5e30" roughness={1} />
      </mesh>
    </group>
  );
}

function Frame({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = progress.current;
    const t = easeInOutCubic(range(p, 0.65, 0.75));
    ref.current.scale.setScalar(lerp(0.001, 1, t));
    ref.current.visible = t > 0.01;
  });
  return (
    <group ref={ref} position={[-3.4, 2, 0]}>
      <mesh>
        <boxGeometry args={[0.06, 1.2, 0.9]} />
        <meshStandardMaterial color="#2a221d" roughness={0.5} />
      </mesh>
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[0.02, 1.0, 0.7]} />
        <meshStandardMaterial color="#c9b896" roughness={0.7} />
      </mesh>
    </group>
  );
}

function CameraRig({ progress }: { progress: ProgressRef }) {
  useFrame((state) => {
    const p = progress.current;
    const angle = lerp(-0.15, 0.05, easeInOutCubic(range(p, 0.0, 1.0)));
    const radius = lerp(7.5, 5.5, easeInOutCubic(range(p, 0.0, 1.0)));
    const height = lerp(4.5, 2.6, easeInOutCubic(range(p, 0.0, 1.0)));
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    state.camera.position.lerp(new THREE.Vector3(x, height, z), 0.08);
    state.camera.lookAt(0, 1.2, 0);
  });
  return null;
}

function Scene({ progress }: { progress: ProgressRef }) {
  const ambient = useRef<THREE.AmbientLight>(null);
  const dir = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const p = progress.current;
    if (ambient.current) {
      ambient.current.intensity = lerp(0.2, 0.55, easeInOutCubic(range(p, 0.0, 0.2)));
    }
    if (dir.current) {
      dir.current.intensity = lerp(0.1, 0.7, easeInOutCubic(range(p, 0.05, 0.3)));
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.2} />
      <directionalLight
        ref={dir}
        position={[5, 8, 4]}
        intensity={0.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <CameraRig progress={progress} />
      <Floor progress={progress} />
      <Rug progress={progress} />
      <Wall progress={progress} seg={[0.08, 0.2]} args={[9, 3]} position={[0, 1.5, -2.25]} rotation={[0, 0, 0]} color="#efe8db" />
      <Wall progress={progress} seg={[0.1, 0.22]} args={[9, 3]} position={[-3.75, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} color="#e8e0d0" />
      <Wall progress={progress} seg={[0.12, 0.24]} args={[4.5, 3]} position={[2.25, 1.5, 2.25]} rotation={[0, Math.PI, 0]} color="#efe8db" />
      <Wall progress={progress} seg={[0.14, 0.26]} args={[4.5, 3]} position={[3.75, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} color="#e8e0d0" />
      <Sofa progress={progress} />
      <CoffeeTable progress={progress} />
      <TVUnit progress={progress} />
      <PendantLight progress={progress} />
      <Plant progress={progress} />
      <Frame progress={progress} />
    </>
  );
}

export function Room3DScene({ progressRef }: { progressRef: ProgressRef }) {
  const dpr: [number, number] = [1, 1.8];
  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [7.5, 4.5, 0], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene progress={progressRef} />
    </Canvas>
  );
}
