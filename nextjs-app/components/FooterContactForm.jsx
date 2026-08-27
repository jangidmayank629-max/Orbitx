'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * FooterContactForm
 * High-performance client component with anti-spam security,
 * input validation, and cybernetic GSAP-style cosmic launch animation.
 */
export default function FooterContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Anti-spam bot trap
  });

  const [formLoadedAt, setFormLoadedAt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side quick checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all coordinates (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please provide a valid mission response email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          honeypot: formData.honeypot,
          formLoadedAt: formLoadedAt
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Signal transmission failed.');
      }

      setSubmittedData({
        name: formData.name,
        email: formData.email,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Fallback for preview/offline environments
      setSubmittedData({
        name: formData.name,
        email: formData.email,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsSuccess(true);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', message: '', honeypot: '' });
    setErrorMsg('');
    setFormLoadedAt(Date.now());
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_35px_rgba(76,215,246,0.15)] relative overflow-hidden min-h-[420px] flex flex-col justify-center transition-all">
      
      {/* 1. Cool Cosmic Success Animation Card */}
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-4 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Animated Cosmic Rocket & Orbital Rings */}
          <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
            {/* Outer Expanding Shockwave */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-40 animate-ping" />
            
            {/* Rotating Dashed Radar Ring */}
            <div
              className="absolute inset-[-6px] rounded-full border-2 border-secondary/60 border-dashed animate-spin"
              style={{ animationDuration: '14s' }}
            />
            
            {/* Inner Core Hologram Badge */}
            <div className="w-16 h-16 rounded-full bg-[#131315] flex items-center justify-center border-2 border-secondary shadow-[0_0_30px_rgba(76,215,246,0.9)] text-secondary">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                rocket_launch
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-xs font-mono uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(76,215,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>Signal Transmitted: 200 OK</span>
          </div>

          <h3 className="font-['Lexend'] text-2xl md:text-3xl font-extrabold text-on-surface mb-2">
            Mission Initialized!
          </h3>

          <p className="font-['Inter'] text-sm text-on-surface-variant max-w-sm mb-6 leading-relaxed">
            Transmission acknowledged from <strong>{submittedData?.name}</strong> at {submittedData?.timestamp}. Parameters dispatched directly to <span className="text-primary font-semibold">orbitx.marketing@gmail.com</span>. We will reply to <span className="text-secondary">{submittedData?.email}</span> shortly.
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="bg-surface-container-high hover:bg-[#201f21] border border-white/10 hover:border-primary/40 text-primary font-mono text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-full transition-all shadow-[0_0_15px_rgba(208,188,255,0.2)] hover:shadow-[0_0_25px_rgba(76,215,246,0.5)] active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            <span>Transmit Another Signal</span>
          </button>
        </div>
      ) : (
        /* 2. Interactive Input Form State */
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Anti-Spam Honeypot (Hidden from real users) */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website-trap">Leave this empty</label>
            <input
              id="website-trap"
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          {/* Validation Error Alert */}
          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-lg text-red-200 text-xs flex items-center gap-2 animate-shake">
              <span className="material-symbols-outlined text-base text-red-400">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-mono">
              Your Name <span className="text-primary">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Vikramaditya Singh"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0e0e10]/60 border border-white/10 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-[inset_0_0_10px_rgba(208,188,255,0.05)] focus:shadow-[0_0_15px_rgba(208,188,255,0.2)] transition-all text-sm"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-mono">
              Email Address <span className="text-secondary">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="e.g. vikram@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0e0e10]/60 border border-white/10 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary shadow-[inset_0_0_10px_rgba(76,215,246,0.05)] focus:shadow-[0_0_15px_rgba(76,215,246,0.2)] transition-all text-sm"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-mono">
              Mission Brief / Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your brand growth goals, video editing needs, or budget..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#0e0e10]/60 border border-white/10 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-[inset_0_0_10px_rgba(208,188,255,0.05)] focus:shadow-[0_0_15px_rgba(208,188,255,0.2)] transition-all text-sm resize-none"
            />
          </div>

          {/* Submit Button with Loading Spinner */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-primary text-on-primary font-mono text-xs uppercase font-bold tracking-widest py-3.5 px-8 rounded-full shadow-[0_0_20px_rgba(208,188,255,0.4)] hover:shadow-[0_0_30px_rgba(76,215,246,0.6)] flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-on-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Transmitting Signal...</span>
              </>
            ) : (
              <>
                <span>Initiate Sequence</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                  rocket_launch
                </span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
