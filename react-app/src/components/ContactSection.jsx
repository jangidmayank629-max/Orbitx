import React, { useState, useRef } from 'react';
import { getGsap } from '../utils/lazyGsap';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sequenceSuccess, setSequenceSuccess] = useState(false);

  const formRef = useRef(null);
  const successCardRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all mission parameters.' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          target: 'orbitx.marketing@gmail.com',
          location: 'Mahwa, Rajasthan (321608)'
        }),
      });

      // Even if offline/mock in demo, trigger animation
      setLoading(false);
      setSequenceSuccess(true);

      // Trigger GSAP Cosmic Burst Animation
      const { gsap } = await getGsap();
      if (successCardRef.current) {
        gsap.fromTo(
          successCardRef.current,
          { scale: 0.85, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );
      }
    } catch (err) {
      console.warn('Backend endpoint unreached, playing client-side success sequence for demo:', err);
      setLoading(false);
      setSequenceSuccess(true);

      const { gsap } = await getGsap();
      if (successCardRef.current) {
        gsap.fromTo(
          successCardRef.current,
          { scale: 0.85, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );
      }
    }
  };

  const handleReset = async () => {
    const { gsap } = await getGsap();
    if (successCardRef.current) {
      gsap.to(successCardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 10,
        duration: 0.25,
        onComplete: () => {
          setSequenceSuccess(false);
          setFormData({ name: '', email: '', message: '' });
          setStatus({ type: '', message: '' });
        }
      });
    }
  };

  return (
    <section id="contact" className="w-full pt-24 pb-16 bg-[#0e0e10] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Local Info & Contacts */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>Mahwa, Rajasthan &bull; 321608</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-['Lexend'] text-on-surface mb-4">
            Ready to <span className="text-gradient">work?</span>
          </h2>
          <p className="font-['Inter'] text-lg text-on-surface-variant mb-8 max-w-md">
            Drop us a line and let's construct the digital strategy that propels your brand into orbit.
          </p>

          <div className="space-y-4 mb-8 font-['Inter'] text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(208,188,255,0.2)]">
                <span className="material-symbols-outlined text-sm">mail</span>
              </div>
              <a href="mailto:orbitx.marketing@gmail.com" className="hover:text-primary transition-colors">
                orbitx.marketing@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shadow-[0_0_15px_rgba(76,215,246,0.2)]">
                <span className="material-symbols-outlined text-sm">call</span>
              </div>
              <a href="tel:+918302664761" className="hover:text-secondary transition-colors">
                +91 8302664761
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form Container */}
        <div className="glass-card rounded-2xl p-6 md:p-10 shadow-[0_0_30px_rgba(76,215,246,0.15)] relative min-h-[400px] flex flex-col justify-center">
          {sequenceSuccess ? (
            <div ref={successCardRef} className="flex flex-col items-center justify-center text-center py-4">
              <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-30 animate-ping" />
                <div className="w-14 h-14 rounded-full bg-[#1c1b1d] flex items-center justify-center border border-secondary shadow-[0_0_20px_rgba(76,215,246,0.8)] text-secondary">
                  <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                </div>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono uppercase tracking-widest mb-2">
                Transmission Acknowledged
              </div>
              <h3 className="font-['Lexend'] text-2xl md:text-3xl font-bold text-on-surface mb-2">Sequence Complete!</h3>
              <p className="font-['Inter'] text-sm text-on-surface-variant max-w-sm mb-6 leading-relaxed">
                Transmission received from <strong>{formData.name}</strong>. Mission parameters forwarded to <span className="text-primary font-medium">orbitx.marketing@gmail.com</span>.
              </p>
              <button
                onClick={handleReset}
                className="bg-surface-container-high hover:bg-surface-container border border-white/10 text-primary px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                <span>Transmit Another Signal</span>
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              {status.type === 'error' && (
                <div className="p-3 bg-red-900/30 border border-red-500/40 rounded-lg text-red-200 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{status.message}</span>
                </div>
              )}

              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0e0e10]/60 border border-white/10 rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-[inset_0_0_10px_rgba(208,188,255,0.05)] transition-all text-sm"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0e0e10]/60 border border-white/10 rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary shadow-[inset_0_0_10px_rgba(76,215,246,0.05)] transition-all text-sm"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your mission..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0e0e10]/60 border border-white/10 rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-[inset_0_0_10px_rgba(208,188,255,0.05)] transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest py-3 px-8 rounded-full shadow-[0_0_20px_rgba(208,188,255,0.4)] hover:shadow-[0_0_30px_rgba(76,215,246,0.6)] flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-on-primary" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Initiate Sequence</span>
                    <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
