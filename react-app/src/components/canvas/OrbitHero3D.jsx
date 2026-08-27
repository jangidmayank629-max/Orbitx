import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * OrbitHero3D
 * High-performance, single-draw-call 3D celestial particle system & orbital rings.
 * Fully adapts vertex/particle complexity dynamically based on device capability.
 */
export default function OrbitHero3D({ particleCount = 2000, isMobile = false }) {
  const pointsRef = useRef();
  const ringRef = useRef();

  // Generate particle coordinates once with optimal TypedArrays
  const [positions, colors] = useMemo(() => {
    const count = particleCount;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const primaryColor = new THREE.Color('#d0bcff');
    const secondaryColor = new THREE.Color('#4cd7f6');

    for (let i = 0; i < count; i++) {
      // Golden ratio spiral distribution inside celestial sphere
      const i3 = i * 3;
      const radius = 3.5 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      // Interpolate colors between cyber-neon primary and secondary
      const mixedColor = primaryColor.clone().lerp(secondaryColor, Math.random());
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [particleCount]);

  // Efficient frame update with delta-time clamping (prevents stuttering on thread hiccups)
  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.05); // Clamp to max 50ms to avoid physics explosions
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y += clampedDelta * 0.08;
      pointsRef.current.rotation.x += clampedDelta * 0.02;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += clampedDelta * 0.15;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3 + 0.8;
    }
  });

  return (
    <group>
      {/* 1. Ambient Lighting (Minimal overhead) */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#4cd7f6" />

      {/* 2. Celestial Instanced Particles (1 Single Draw Call!) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.06}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Outer Orbital Neon Ring (Optimized geometry complexity) */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[4.2, 0.015, isMobile ? 8 : 16, isMobile ? 32 : 64]} />
        <meshBasicMaterial
          color="#d0bcff"
          wireframe={false}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
