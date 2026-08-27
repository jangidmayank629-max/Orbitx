import React, { Suspense, lazy, useEffect } from 'react';
import CyberLoader from './components/canvas/CyberLoader';
import WorkSlider from './components/WorkSlider';
import ContactSection from './components/ContactSection';
import { preloadGsapOnIdle } from './utils/lazyGsap';

// Senior Optimization: Code-split heavy 3D WebGL bundle out of main bundle
const AdaptiveCanvas = lazy(() => import('./components/canvas/AdaptiveCanvas'));

export default function App() {
  useEffect(() => {
    // Preload GSAP on browser idle time so animations are ready before user scrolls
    preloadGsapOnIdle();
  }, []);

  return (
    <div className="bg-[#0A0A0C] text-[#e5e1e4] font-['Inter'] min-h-screen selection:bg-primary selection:text-on-primary">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-[#131315]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(208,188,255,0.15)]">
        <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-7xl mx-auto">
          <a href="#" className="text-2xl font-bold font-['Lexend'] text-primary tracking-tighter">
            OrbitX
          </a>
          <div className="hidden md:flex space-x-6 text-sm">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#work" className="hover:text-primary transition-colors">Work</a>
            <a href="#arsenal" className="hover:text-primary transition-colors">Arsenal</a>
            <a href="#results" className="hover:text-primary transition-colors">Results</a>
            <a href="#contact" className="text-primary font-bold border-b-2 border-primary pb-1">Contact</a>
          </div>
          <a
            href="#contact"
            className="bg-primary text-on-primary text-xs uppercase font-bold tracking-widest px-6 py-2 rounded-full hover:shadow-[0_0_20px_rgba(76,215,246,0.5)] transition-all active:scale-95 hidden md:inline-block"
          >
            Book now
          </a>
        </div>
      </nav>

      {/* Hero Section with 3D Canvas Suspense Boundary */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4">
        {/* Lazy Loaded 3D Celestial Canvas */}
        <Suspense fallback={<CyberLoader />}>
          <AdaptiveCanvas />
        </Suspense>

        {/* Hero Content Overlay */}
        <div className="relative z-10 text-center glass-card p-8 md:p-14 rounded-2xl max-w-3xl shadow-[0_0_35px_rgba(208,188,255,0.15)] mx-auto mt-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>Best Social Media Marketing Agency &bull; Mahwa, Rajasthan (321608)</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-['Lexend'] text-on-surface mb-6 leading-tight">
            Dominate the <span className="text-gradient">Digital Space</span>
          </h1>
          <p className="font-['Inter'] text-base md:text-lg text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed">
            Fueling the next digital frontier with high-velocity social media management, cinematic video editing, and hyper-targeted conversion campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-primary text-on-primary text-xs uppercase font-bold tracking-widest px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(208,188,255,0.4)] hover:shadow-[0_0_30px_rgba(76,215,246,0.6)] transition-all active:scale-95"
            >
              Book consultation
            </a>
            <a
              href="#services"
              className="glass-card text-on-surface hover:text-primary text-xs uppercase font-bold tracking-widest px-8 py-3.5 rounded-full border border-white/10 hover:border-primary/40 transition-all active:scale-95"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-['Lexend'] text-on-surface mb-2">Our Services</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_rgba(208,188,255,0.8)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[550px]">
          <div className="glass-card rounded-xl p-6 relative overflow-hidden md:col-span-2 md:row-span-2 flex flex-col justify-end">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary text-4xl mb-3 block">movie_edit</span>
              <h3 className="font-['Lexend'] font-bold text-2xl text-on-surface mb-2">Cinematic Video Editing</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                High-retention short-form reels & long-form YouTube edits crafted with viral pacing to captivate attention instantly.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 relative overflow-hidden md:col-span-2 md:row-span-1 shadow-[0_0_20px_rgba(76,215,246,0.1)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary">
              <span className="material-symbols-outlined text-2xl">ads_click</span>
            </div>
            <div>
              <h3 className="font-['Lexend'] font-bold text-xl text-on-surface mb-1">Targeted Ad Campaigns</h3>
              <p className="text-xs text-on-surface-variant">
                Aggressive ROAS scaling across Meta, Google & YouTube with precision audience lookalikes.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 relative overflow-hidden md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2 text-primary">
              <span className="material-symbols-outlined text-xl">travel_explore</span>
            </div>
            <h3 className="font-['Lexend'] font-bold text-base text-on-surface mb-1">Local & Global SEO</h3>
            <p className="text-xs text-on-surface-variant">Dominate Mahwa & global keywords.</p>
          </div>

          <div className="glass-card rounded-xl p-6 relative overflow-hidden md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center shadow-[0_0_20px_rgba(76,215,246,0.1)]">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-2 text-secondary">
              <span className="material-symbols-outlined text-xl">share</span>
            </div>
            <h3 className="font-['Lexend'] font-bold text-base text-on-surface mb-1">Social Management</h3>
            <p className="text-xs text-on-surface-variant">Build an unstoppable community.</p>
          </div>
        </div>
      </section>

      {/* Hardware-Accelerated Touch Carousel */}
      <WorkSlider />

      {/* Interactive Contact Form & GSAP Sequence */}
      <ContactSection />

      {/* Footer */}
      <footer className="w-full py-12 bg-[#0e0e10] border-t border-white/5 text-center text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold text-primary text-base">OrbitX Dynamics</span>
          <div className="flex gap-4 font-mono text-xs">
            <a href="https://www.instagram.com/orbitx.marketing_mahwa?igsi=MTQ1ZGEzb21pcTM0aA==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.instagram.com/orbitx.marketing_mahwa?igsi=MTQ1ZGEzb21pcTM0aA==" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">LinkedIn</a>
          </div>
          <span>&copy; 2024 OrbitX Marketing &bull; Mahwa, Rajasthan (321608)</span>
          <a href="mailto:orbitx.marketing@gmail.com" className="text-secondary hover:underline">
            orbitx.marketing@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
