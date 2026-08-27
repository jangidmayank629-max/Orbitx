import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import CyberLoader from './CyberLoader';
import OrbitHero3D from './OrbitHero3D';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';

/**
 * AdaptiveCanvas
 * Top-tier WebGL Performance Container.
 * Features:
 *  - IntersectionObserver: automatically stops WebGL render loop when out of viewport.
 *  - Adaptive DPR & PerformanceMonitor: auto-throttles DPR dynamically during frame drops.
 *  - Non-blocking touch events (pointer-events-none) to preserve native 120Hz smooth scrolling.
 */
export default function AdaptiveCanvas() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const [dprFactor, setDprFactor] = useState(1);
  const { dpr, particleCount, isMobile } = useDevicePerformance();

  // Pause WebGL rendering entirely when canvas scrolls out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      style={{ touchAction: 'pan-y' }}
    >
      <Suspense fallback={<CyberLoader />}>
        <Canvas
          // Adaptive render loop: only render when in view to save mobile battery & thermals
          frameloop={isInView ? 'always' : 'never'}
          camera={{ position: [0, 0, 8], fov: isMobile ? 60 : 50 }}
          dpr={dpr * dprFactor}
          gl={{
            powerPreference: 'high-performance',
            antialias: !isMobile, // Disable MSAA on mobile (high DPR screens don't need expensive antialiasing)
            alpha: true,
            stencil: false,
            depth: true,
            precision: isMobile ? 'mediump' : 'highp',
          }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Automatically step down DPR if 3 consecutive frames drop below 50fps */}
          <PerformanceMonitor
            onDecline={() => setDprFactor((prev) => Math.max(0.75, prev - 0.2))}
            onIncline={() => setDprFactor((prev) => Math.min(1.0, prev + 0.1))}
          >
            <AdaptiveDpr pixelated={false} />
            <AdaptiveEvents />
            <OrbitHero3D particleCount={particleCount} isMobile={isMobile} />
          </PerformanceMonitor>
        </Canvas>
      </Suspense>
    </div>
  );
}
