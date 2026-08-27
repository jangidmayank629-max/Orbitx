import React, { useRef, useState, useEffect } from 'react';

const WORK_CARDS = [
  {
    id: 1,
    title: 'FinTech Growth',
    metric: '300% increase in user acquisition through targeted ad campaigns.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5oh3fqTh3IogCxjMkKIcE-q9kyD6g71ljE_dcmUEqEfs0wpXkt9e-4yq4K_Ovj2MFz_wD1rmTvT4rzGRcAH25-Fw7YzPS7SZRFdqb8tk4RMBsmIDSzzGWUgvI2yJT0PdY3Vz5bRhYVdVySSAI3M-N4Jde5_nA7kIO0KGBp53qsWiTFykxSrb_TD_MejuRf2UOz1p7LtFytiWxRpfyrYpNAIZRNE_UVl-RNJIPxP4waLb66oNfNDzKwA',
    neon: false,
  },

  {
    id: 3,
    title: 'SEO Dominance',
    metric: 'Secured #1 ranking for high-intent keywords in Mahwa, Rajasthan & beyond.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCui1zpfB2Be-_bJTwEnGmsTtXZZlpupPcWFgQPiEpOhKICB_OW2gtGz0GssW-A3fix_Yb1XcqBdrdueoNMYwE0kcGBbceM-yA51jxF4nkFxJrmxaXVJ2IZMGdjKHgYUb0mZ2ASSGMjT2zM3hI90xzXv8C5Q6_sR6juTfEkhjg6Z_6UR285p5vHwrJfsi-YFcSRaVYUxE6WraKF6gHIMH4CzsBbN0es5F1psE_Xtjbre-_qLCZT9n5pZQ',
    neon: false,
  },
  {
    id: 4,
    title: 'Conversion Optimization',
    metric: 'Redesigned funnel leading to a 150% uplift in sales for SaaS client.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKO_0CVak8JCE1aXU8FUCY1uwNeUl73Bdn62uUdXUtCF8Xvf1_KWHaUByctZ23T6PKRKyqNVNOH2Xx0DiiZcZmJmqtR_p57LcDnvCcxuOTwyANbWjZHIE5EIbc5d8HdS_oCJb5fATCfheraSGd-PCixZWlNeki8nbKCSyta9p95vKIQ0TE5K9Zwnngl6D-i1-wnpmk49E6cCNgF6CcOfB1Y93ZmWW9tE8qcqS9T5mg6dV2PGpSdcASCg',
    neon: true,
  },
  {
    id: 5,
    title: 'Web3 & Creator Scaling',
    metric: 'Scaled community from 0 to 50k active members in one month.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANvRooUJj5R_ynv9qKMfhzKg1HTluSEfQCmHqiBvfKMztMvw1u7BY0AQ9MlofsQK4ZAT4QgZ8EVdlqcdBK1pw0dzvR6z2SbEY961RNSeYqW5NgEx8ANnofuq1jRtBon2Kd4HOjqC7L0lsaTP8uJxgOskbZcdSR43vmDbAFGwZ-ZXEAbGqJW17E30mn4Wkb4SF5EmwyPDvOVicd0eXA9NEFhzfxUBqFn7vJMrnq6s5BP5WYi7iNQ0JRww',
    neon: false,
  }
];

/**
 * WorkSlider
 * Touch-optimized, 120fps hardware-accelerated carousel.
 * Eliminates swipe stutter on mobile/tablets by using CSS scroll-snap with passive pointer dragging.
 */
export default function WorkSlider() {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const onPointerDown = (e) => {
    // Only capture primary mouse button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsDragging(true);
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    sliderRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Smooth multiplier
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      sliderRef.current.releasePointerCapture(e.pointerId);
    } catch (err) {
      // safe fallback
    }
  };

  return (
    <section id="work" className="py-24 max-w-[100vw] overflow-hidden relative">
      <div className="text-center mb-12 px-4 md:px-16">
        <h2 className="text-3xl md:text-5xl font-bold font-['Lexend'] text-on-surface mb-2">Our Work</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-[0_0_10px_rgba(208,188,255,0.8)]" />
        <p className="text-sm font-['Inter'] text-on-surface-variant mt-2">Swipe horizontally to explore portfolio missions</p>
      </div>

      <div
        ref={sliderRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`flex gap-6 overflow-x-auto px-4 md:px-16 no-scrollbar snap-x snap-mandatory cursor-grab ${
          isDragging ? 'cursor-grabbing select-none' : ''
        }`}
        style={{
          touchAction: 'pan-y', // Critical: Allows smooth vertical page scroll while swiping horizontally
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          transform: 'translate3d(0,0,0)', // Trigger hardware composition layer
        }}
      >
        {WORK_CARDS.map((card) => (
          <div
            key={card.id}
            className={`glass-card rounded-xl p-4 w-[290px] md:w-[440px] shrink-0 snap-start transition-all duration-300 group ${
              card.neon ? 'shadow-[0_0_25px_rgba(76,215,246,0.15)]' : ''
            }`}
          >
            <div className="w-full h-[190px] md:h-[240px] rounded-lg bg-surface-container-high mb-4 overflow-hidden relative">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] to-transparent opacity-60 pointer-events-none" />
            </div>
            <h3 className="font-['Lexend'] font-bold text-xl text-on-surface mb-1">{card.title}</h3>
            <p className="font-['Inter'] text-sm text-on-surface-variant mb-4 leading-relaxed">{card.metric}</p>
            <a
              href="#contact"
              className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:text-secondary transition-colors"
            >
              <span>View Case Study</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
