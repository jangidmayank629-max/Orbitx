import React from 'react';

/**
 * CyberLoader
 * Ultra-lightweight Suspense fallback indicator (0 KB 3D overhead, pure CSS).
 */
export default function CyberLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-surface/30 backdrop-blur-sm z-20">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Pulsing neon orbital ring */}
        <div className="absolute inset-0 rounded-full border border-primary/40 border-t-secondary animate-spin" />
        <div className="w-8 h-8 rounded-full bg-primary/20 shadow-[0_0_15px_rgba(208,188,255,0.4)] animate-pulse" />
      </div>
      <span className="mt-3 text-xs font-mono uppercase tracking-widest text-secondary opacity-80">
        Initializing Orbit...
      </span>
    </div>
  );
}
