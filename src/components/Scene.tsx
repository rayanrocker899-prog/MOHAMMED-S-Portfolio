import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointer } from "@/lib/motion";

/** Global scroll progress 0..1, updated by App via GSAP (cheap, no React re-renders). */
export const scrollState = { p: 0, v: 0 };

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 22;
      const t = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 60;
      arr[i * 3] = Math.cos(t) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(t) * r;
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#c9a961" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Rings() {
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!g.current) return;
    const p = scrollState.p;
    g.current.rotation.x = Math.PI / 2.4 + p * Math.PI * 0.6 + pointer.y * 0.08;
    g.current.rotation.z = p * Math.PI * 1.2 + pointer.x * 0.1;
    g.current.position.y = -p * 46 + 2;
    const s = 1 + Math.sin(p * Math.PI) * 0.6;
    g.current.scale.setScalar(s);
  });
  const mat = <meshBasicMaterial color="#c9a961" transparent opacity={0.28} wireframe />;
  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[4.2, 0.012, 8, 160]} />
        {mat}
      </mesh>
      <mesh rotation={[0.4, 0, 0]}>
        <torusGeometry args={[5.6, 0.01, 8, 180]} />
        <meshBasicMaterial color="#9a9ca3" transparent opacity={0.16} />
      </mesh>
      <mesh rotation={[-0.3, 0.5, 0]}>
        <torusGeometry args={[7.2, 0.008, 8, 200]} />
        <meshBasicMaterial color="#c9a961" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function Core() {
  const m = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    const p = scrollState.p;
    if (m.current) {
      m.current.rotation.y += dt * 0.12 + scrollState.v * 0.4;
      m.current.rotation.x = p * Math.PI * 2 + pointer.y * 0.15;
      m.current.position.y = -p * 46 + 2;
      m.current.position.x = Math.sin(p * Math.PI * 2) * 3.5 + pointer.x * 0.4;
      m.current.position.z = -2 + Math.cos(p * Math.PI * 2) * 2;
    }
    if (inner.current) {
      inner.current.rotation.copy(m.current!.rotation);
      inner.current.rotation.y *= -1;
      inner.current.position.copy(m.current!.position);
    }
  });
  return (
    <>
      <mesh ref={m}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshStandardMaterial color="#1a1b1f" metalness={0.95} roughness={0.25} wireframe />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial color="#c9a961" metalness={0.9} roughness={0.3} emissive="#3a2e14" emissiveIntensity={0.6} />
      </mesh>
    </>
  );
}

function Pillars() {
  // Vertical technical lines that create depth as the camera descends.
  const lines = useMemo(() => {
    const arr: { x: number; z: number; h: number }[] = [];
    for (let i = 0; i < 26; i++) {
      const t = (i / 26) * Math.PI * 2;
      const r = 9 + (i % 3) * 3;
      arr.push({ x: Math.cos(t) * r, z: Math.sin(t) * r, h: 20 + Math.random() * 30 });
    }
    return arr;
  }, []);
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    if (g.current) g.current.rotation.y = scrollState.p * 0.8 + pointer.x * 0.04;
  });
  return (
    <group ref={g} position={[0, -22, 0]}>
      {lines.map((l, i) => (
        <mesh key={i} position={[l.x, 0, l.z]}>
          <boxGeometry args={[0.02, l.h, 0.02]} />
          <meshBasicMaterial color={i % 4 === 0 ? "#c9a961" : "#3a3c42"} transparent opacity={i % 4 === 0 ? 0.35 : 0.25} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  useFrame(({ camera }) => {
    const p = scrollState.p;
    const targetY = -p * 46 + 2;
    const tx = pointer.x * 0.9 + Math.sin(p * Math.PI * 2) * 1.2;
    const tz = 11 + Math.sin(p * Math.PI) * -3.5;
    camera.position.x += (tx - camera.position.x) * 0.06;
    camera.position.y += (targetY + pointer.y * -0.5 - camera.position.y) * 0.1;
    camera.position.z += (tz - camera.position.z) * 0.06;
    camera.lookAt(0, targetY, 0);
    camera.rotation.z = Math.sin(p * Math.PI * 2) * 0.03;
  });
  return null;
}

export default function Scene({ reduced }: { reduced: boolean }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2, 11], fov: 48, near: 0.1, far: 120 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <fog attach="fog" args={["#050505", 10, 40]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} color="#f1e3c0" />
        <pointLight position={[-6, -4, 2]} intensity={1.2} color="#c9a961" />
        <CameraRig />
        <Particles />
        <Rings />
        <Core />
        <Pillars />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />
    </div>
  );
}
