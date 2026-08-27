import React from 'react';
import { siteConfig } from '../lib/seo/siteConfig';
import FooterContactForm from '../components/FooterContactForm';

export default function HomePage() {
  return (
    <>
      {/* Semantic Top Navigation Header */}
      <header role="banner" className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(208,188,255,0.15)]">
        <nav aria-label="Main Navigation" className="flex justify-between items-center px-4 md:px-16 py-4 max-w-7xl mx-auto">
          <a href="#" className="text-2xl font-bold font-headline text-primary tracking-tighter hover:opacity-90 transition-opacity">
            OrbitX
          </a>
          <ul role="list" className="hidden md:flex space-x-6 text-sm font-sans">
            <li>
              <a href="#services" className="hover:text-primary transition-colors py-1">Services</a>
            </li>
            <li>
              <a href="#work" className="hover:text-primary transition-colors py-1">Work</a>
            </li>
            <li>
              <a href="#arsenal" className="hover:text-primary transition-colors py-1">Arsenal</a>
            </li>
            <li>
              <a href="#results" className="hover:text-primary transition-colors py-1">Results</a>
            </li>
            <li>
              <a href="#faq" className="hover:text-primary transition-colors py-1">FAQ</a>
            </li>
            <li>
              <a href="#contact" className="text-primary font-bold border-b-2 border-primary pb-1">Contact</a>
            </li>
          </ul>
          <a
            href="#contact"
            className="bg-primary text-on-primary text-xs uppercase font-bold tracking-widest px-6 py-2 rounded-full hover:shadow-[0_0_20px_rgba(76,215,246,0.5)] transition-all active:scale-95 hidden md:inline-block"
          >
            Book Consultation
          </a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main id="main-content" role="main">
        {/* 1. Hero Section */}
        <section
          aria-labelledby="hero-title"
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-20"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 text-center glass-card p-8 md:p-14 rounded-2xl max-w-4xl shadow-[0_0_35px_rgba(208,188,255,0.15)] mx-auto">
            {/* Geo Location Badge for Local SEO */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(76,215,246,0.15)]">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>Best Social Media Marketing Agency &bull; Mahwa, Rajasthan (321608)</span>
            </div>

            {/* Single Primary <h1> Heading for SEO */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline text-on-surface mb-6 leading-[1.1] tracking-tight"
            >
              Dominate the <span className="text-gradient">Digital Space</span>
            </h1>

            <p className="font-sans text-base md:text-xl text-on-surface-variant mb-8 max-w-2xl mx-auto leading-relaxed">
              Fueling the next digital frontier with high-velocity <strong>social media marketing</strong>, cinematic <strong>video editing services</strong>, and hyper-targeted conversion campaigns engineered by certified <strong>digital marketing experts</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="w-full sm:w-auto bg-primary text-on-primary text-xs uppercase font-bold tracking-widest px-8 py-4 rounded-full shadow-glow-primary hover:shadow-glow-secondary transition-all active:scale-95 text-center"
              >
                Initiate Mission
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto glass-card text-on-surface hover:text-primary text-xs uppercase font-bold tracking-widest px-8 py-4 rounded-full border border-white/10 hover:border-primary/40 transition-all active:scale-95 text-center"
              >
                Explore Services
              </a>
            </div>
          </div>
        </section>

        {/* 2. Services Section */}
        <section id="services" aria-labelledby="services-title" className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h2 id="services-title" className="text-3xl md:text-5xl font-bold font-headline text-on-surface mb-2">
              Our Core Services
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_rgba(208,188,255,0.8)]" />
            <p className="text-sm font-sans text-on-surface-variant mt-3 max-w-xl mx-auto">
              Precision digital marketing and viral production services tailored for brands scaling in Mahwa, Rajasthan, and globally.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[550px]">
            {/* Service 1: Video Editing */}
            <article className="glass-card rounded-2xl p-8 relative overflow-hidden md:col-span-2 md:row-span-2 flex flex-col justify-end group">
              <div className="streak-top" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-5xl mb-4 block" aria-hidden="true">movie_edit</span>
                <h3 className="font-headline font-bold text-2xl md:text-3xl text-on-surface mb-2">
                  Cinematic Video Editing Services
                </h3>
                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                  High-retention short-form reels, TikToks, YouTube Shorts, and brand documentaries crafted with viral pacing, sound design, and color grading.
                </p>
              </div>
            </article>

            {/* Service 2: Targeted Ad Campaigns */}
            <article className="glass-card rounded-2xl p-6 relative overflow-hidden md:col-span-2 md:row-span-1 shadow-neon-secondary flex items-center gap-5">
              <div className="streak-top" />
              <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">ads_click</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-xl text-on-surface mb-1">
                  Targeted PPC & Social Ad Campaigns
                </h3>
                <p className="text-xs md:text-sm text-on-surface-variant">
                  Hyper-targeted paid acquisition across Meta Ads, Google Ads, and YouTube to maximize conversion rates and ROAS.
                </p>
              </div>
            </article>

            {/* Service 3: Local & Global SEO */}
            <article className="glass-card rounded-2xl p-6 relative overflow-hidden md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center">
              <div className="streak-top" />
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3 text-primary">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">travel_explore</span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface mb-1">
                Local & Global SEO
              </h3>
              <p className="text-xs text-on-surface-variant">
                Dominate Google search results in Mahwa (321608), Rajasthan, and nationwide.
              </p>
            </article>

            {/* Service 4: Social Media Management */}
            <article className="glass-card rounded-2xl p-6 relative overflow-hidden md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center shadow-neon-secondary">
              <div className="streak-top" />
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-3 text-secondary">
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">share</span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface mb-1">
                Social Media Marketing
              </h3>
              <p className="text-xs text-on-surface-variant">
                Full-stack community growth, trend analysis, and daily content distribution.
              </p>
            </article>
          </div>
        </section>

        {/* 3. Case Studies / Work Section */}
        <section id="work" aria-labelledby="work-title" className="py-24 max-w-7xl mx-auto px-4 md:px-16 overflow-hidden">
          <header className="text-center mb-16">
            <h2 id="work-title" className="text-3xl md:text-5xl font-bold font-headline text-on-surface mb-2">
              Featured Case Studies
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-[0_0_10px_rgba(208,188,255,0.8)]" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="glass-card rounded-2xl p-5 group">
              <figure className="m-0 mb-4">
                <div className="w-full h-56 rounded-xl bg-surface-container-high overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5oh3fqTh3IogCxjMkKIcE-q9kyD6g71ljE_dcmUEqEfs0wpXkt9e-4yq4K_Ovj2MFz_wD1rmTvT4rzGRcAH25-Fw7YzPS7SZRFdqb8tk4RMBsmIDSzzGWUgvI2yJT0PdY3Vz5bRhYVdVySSAI3M-N4Jde5_nA7kIO0KGBp53qsWiTFykxSrb_TD_MejuRf2UOz1p7LtFytiWxRpfyrYpNAIZRNE_UVl-RNJIPxP4waLb66oNfNDzKwA"
                    alt="FinTech user acquisition data analytics chart"
                    loading="lazy"
                    width="450"
                    height="250"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="sr-only">FinTech Growth Case Study</figcaption>
              </figure>
              <h3 className="font-headline font-bold text-xl text-on-surface mb-1">FinTech Scale-Up</h3>
              <p className="font-sans text-sm text-on-surface-variant mb-4">300% increase in qualified user acquisition via targeted ad campaigns.</p>
              <a href="#contact" className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:text-secondary transition-colors">
                View Case Study <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </a>
            </article>

            <article className="glass-card rounded-2xl p-5 group">
              <figure className="m-0 mb-4">
                <div className="w-full h-56 rounded-xl bg-surface-container-high overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCui1zpfB2Be-_bJTwEnGmsTtXZZlpupPcWFgQPiEpOhKICB_OW2gtGz0GssW-A3fix_Yb1XcqBdrdueoNMYwE0kcGBbceM-yA51jxF4nkFxJrmxaXVJ2IZMGdjKHgYUb0mZ2ASSGMjT2zM3hI90xzXv8C5Q6_sR6juTfEkhjg6Z_6UR285p5vHwrJfsi-YFcSRaVYUxE6WraKF6gHIMH4CzsBbN0es5F1psE_Xtjbre-_qLCZT9n5pZQ"
                    alt="SEO rankings growth curve showing #1 Google rank"
                    loading="lazy"
                    width="450"
                    height="250"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="sr-only">SEO Keyword Dominance Case Study</figcaption>
              </figure>
              <h3 className="font-headline font-bold text-xl text-on-surface mb-1">Local & Regional SEO</h3>
              <p className="font-sans text-sm text-on-surface-variant mb-4">Secured #1 ranking across competitive regional queries in Rajasthan.</p>
              <a href="#contact" className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:text-secondary transition-colors">
                View Case Study <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </a>
            </article>
          </div>
        </section>

        {/* 4. Results Section (Semantic <dl>) */}
        <section id="results" aria-labelledby="results-title" className="py-20 bg-surface-container-lowest/80 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
            <h2 id="results-title" className="sr-only">Key Performance Metrics</h2>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center">
                <dd className="text-5xl md:text-6xl font-extrabold font-headline text-secondary mb-2">5M+</dd>
                <dt className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Global Video Impressions</dt>
              </div>
              <div className="flex flex-col items-center">
                <dd className="text-5xl md:text-6xl font-extrabold font-headline text-primary mb-2">200%</dd>
                <dt className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Average Campaign ROAS</dt>
              </div>
              <div className="flex flex-col items-center">
                <dd className="text-5xl md:text-6xl font-extrabold font-headline text-secondary mb-2">20+</dd>
                <dt className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Enterprise Brands Scaled</dt>
              </div>
            </dl>
          </div>
        </section>

        {/* 5. Semantic FAQ Section */}
        <section id="faq" aria-labelledby="faq-title" className="py-24 max-w-4xl mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-bold font-headline text-on-surface mb-2">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full shadow-[0_0_10px_rgba(76,215,246,0.8)]" />
          </header>

          <div className="space-y-4 font-sans">
            <details className="glass-card rounded-xl p-5 group open:bg-surface-container-high transition-colors">
              <summary className="font-bold text-lg text-on-surface cursor-pointer list-none flex justify-between items-center">
                <span>Why choose OrbitX Marketing as the best agency in Mahwa, Rajasthan?</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                OrbitX Marketing combines Silicon Valley growth methodologies with local market expertise in Mahwa (321608). We prioritize data-driven conversions, high-velocity creative testing, and transparent ROI metrics.
              </p>
            </details>

            <details className="glass-card rounded-xl p-5 group open:bg-surface-container-high transition-colors">
              <summary className="font-bold text-lg text-on-surface cursor-pointer list-none flex justify-between items-center">
                <span>What video editing services do you offer?</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                We produce viral short-form edits for Instagram Reels and YouTube Shorts, long-form podcast & YouTube documentary edits, 3D motion graphics, and audio mastering optimized for high audience retention.
              </p>
            </details>
          </div>
        </section>

        {/* 6. Contact Form Section */}
        <section id="contact" aria-labelledby="contact-title" className="py-24 bg-surface-container-lowest border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="contact-title" className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface mb-4">
                Initiate Your <span className="text-gradient">Mission</span>
              </h2>
              <p className="font-sans text-lg text-on-surface-variant mb-8 max-w-md">
                Ready to dominate search and social? Contact the leading digital marketing experts in Mahwa, Rajasthan.
              </p>

              {/* Semantic Address Tag for Local Business */}
              <address className="not-italic space-y-4 mb-8 font-sans text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-glow-primary">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">mail</span>
                  </div>
                  <a href="mailto:orbitx.marketing@gmail.com" className="hover:text-primary transition-colors">
                    orbitx.marketing@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shadow-glow-secondary">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">call</span>
                  </div>
                  <a href="tel:+918302664761" className="hover:text-secondary transition-colors">
                    +91 8302664761
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-glow-primary">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">location_on</span>
                  </div>
                  <span>{siteConfig.location.streetAddress}, {siteConfig.location.addressLocality}, {siteConfig.location.addressRegion} ({siteConfig.location.postalCode})</span>
                </div>
              </address>
            </div>

            {/* Interactive Client Component */}
            <FooterContactForm />
          </div>
        </section>
      </main>

      {/* Semantic Footer */}
      <footer role="contentinfo" className="w-full py-12 bg-surface-container-lowest border-t border-white/5 text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold text-primary text-lg font-headline">OrbitX Dynamics</span>
            <p className="text-xs text-on-surface-variant mt-1">
              Top Social Media Marketing Agency &bull; Mahwa, Rajasthan (321608)
            </p>
          </div>

          <nav aria-label="Footer Legal & Social Links" className="flex flex-wrap gap-4 font-mono">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="https://www.instagram.com/orbitx.marketing_mahwa?igsi=MTQ1ZGEzb21pcTM0aA==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.instagram.com/orbitx.marketing_mahwa?igsi=MTQ1ZGEzb21pcTM0aA==" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">LinkedIn</a>
          </nav>

          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} OrbitX Marketing. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
