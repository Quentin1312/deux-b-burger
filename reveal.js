// Fade-up on scroll for any element carrying data-reveal="<delay ms>".
// Only use it on wrappers that have no inline transform/opacity/transition of their own.
// Scroll-position based (no IntersectionObserver) + safety timeout, so content can never stay hidden.
export function initReveal() {
  const all = () => document.querySelectorAll('[data-reveal]');
  const show = el => {
    if (el.dataset.rv === 'done') return;
    el.dataset.rv = 'done';
    el.style.transition = 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)';
    el.style.transitionDelay = (el.dataset.reveal || 0) + 'ms';
    el.style.opacity = ''; el.style.transform = '';
    setTimeout(() => { el.style.transition = ''; el.style.transitionDelay = ''; }, 1800);
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { all().forEach(show); return () => {}; }
  const check = () => {
    const lim = window.innerHeight * 0.92;
    all().forEach(el => {
      if (el.dataset.rv === 'done') return;
      const top = el.getBoundingClientRect().top;
      if (!el.dataset.rv) {
        if (top < lim) { el.dataset.rv = 'done'; return; }
        el.dataset.rv = 'pending'; el.style.opacity = '0'; el.style.transform = 'translateY(40px)';
      } else if (top < lim) show(el);
    });
  };
  let raf = 0;
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; check(); }); };
  check();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  const mo = new MutationObserver(onScroll);
  mo.observe(document.body, { childList: true, subtree: true });
  const safety = setInterval(() => all().forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) show(el); }), 1200);
  const onPrint = () => all().forEach(show);
  window.addEventListener('beforeprint', onPrint);
  return () => {
    window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll);
    window.removeEventListener('beforeprint', onPrint); mo.disconnect(); clearInterval(safety);
    all().forEach(show);
  };
}
