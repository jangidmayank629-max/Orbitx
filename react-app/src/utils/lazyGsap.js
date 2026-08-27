/**
 * lazyGsap
 * Asynchronously loads GSAP and ScrollTrigger only when animations are about to trigger.
 * Eliminates ~80KB from critical render-blocking bundle path.
 */
let gsapPromise = null;

export async function getGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default || gsapModule.gsap || gsapModule;
      const ScrollTrigger = scrollTriggerModule.default || scrollTriggerModule.ScrollTrigger || scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });
  }
  return gsapPromise;
}

/**
 * Preload GSAP on idle queue
 */
export function preloadGsapOnIdle() {
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => getGsap());
    } else {
      setTimeout(() => getGsap(), 2000);
    }
  }
}
