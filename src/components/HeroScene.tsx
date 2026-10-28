"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network() {
  const group = useRef<THREE.Group>(null);
  const { points, lines } = useMemo(() => {
    const n = 90;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(1.9));
    }
    const seg: number[] = [];
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        if (pts[i].distanceTo(pts[j]) < 0.95) seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
    return { points: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])), lines: new Float32Array(seg) };
  }, []);

  useFrame(({ pointer }, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.15;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.35, 0.05);
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.x * 0.25, 0.05);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" array={points} count={points.length / 3} itemSize={3} /></bufferGeometry>
        <pointsMaterial size={0.07} color="#19A8E0" sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" array={lines} count={lines.length / 3} itemSize={3} /></bufferGeometry>
        <lineBasicMaterial color="#0876C9" transparent opacity={0.35} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshBasicMaterial color="#103F78" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
      <Network />
    </Canvas>
  );
}
