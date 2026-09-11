const hero = document.querySelector<HTMLElement>('[data-cinematic-hero]');
const video = hero?.querySelector<HTMLVideoElement>('.cinematic-film');
const chapters = hero ? Array.from(hero.querySelectorAll<HTMLElement>('[data-cinematic-chapter]')) : [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const skip = hero?.querySelector<HTMLAnchorElement>('.cinematic-skip');
const work = document.querySelector<HTMLElement>('#work');
const heroActions = hero?.querySelector<HTMLElement>('.cinematic-intro .actions');
const cyborg = hero?.querySelector<HTMLImageElement>('[data-cyborg]');
const bullseye = hero?.querySelector<HTMLImageElement>('[data-bullseye]');

skip?.addEventListener('click', (event) => {
  if (!work) return;
  event.preventDefault();
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  work.scrollIntoView({ block: 'start' });
  root.style.scrollBehavior = previousScrollBehavior;
  history.replaceState(null, '', '#work');
  work.focus({ preventScroll: true });
});

if (hero && video && !reduceMotion.matches) {
  let scheduled = false;
  let duration = 0;
  let progress = 0;
  let lastFrame = 0;
  let targetTime = 0;
  let decodedTime = 0;

  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const smoothstep = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
  // Keep one seek in flight. Replacing pending seeks on every scroll can starve decoding.
  const seek = () => {
    if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime;
  };

  const render = (now: number) => {
    scheduled = false;
    if (!hero.classList.contains('is-ready')) return;
    const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
    const destination = clamp((window.scrollY - hero.offsetTop) / travel);
    const elapsed = Math.min(32, lastFrame ? now - lastFrame : 16);
    lastFrame = now;
    progress += (destination - progress) * (1 - Math.exp(-elapsed / 90));
    if (Math.abs(destination - progress) < 0.0001) progress = destination;
    const introOpacity = 1 - smoothstep(progress / 0.14);
    const filmOpacity = smoothstep((progress - 0.25) / 0.06);
    const storyOpacity = smoothstep((progress - 0.16) / 0.06) * (1 - smoothstep((progress - 0.95) / 0.05));
    const chapterIndex = progress < 0.28 ? 0 : progress < 0.5 ? 1 : Math.min(chapters.length - 1, Math.max(2, Math.floor(decodedTime / duration * chapters.length)));
    // Matching stills blend in place; reversing scroll reverses the transformation.
    if (cyborg) cyborg.style.opacity = (smoothstep((progress - 0.025) / 0.13) * (1 - filmOpacity)).toFixed(4);
    if (bullseye) bullseye.style.opacity = smoothstep((progress - 0.82) / 0.06).toFixed(4);

    hero.style.setProperty('--sequence-progress', progress.toFixed(4));
    hero.style.setProperty('--poster-opacity', (1 - filmOpacity).toFixed(4));
    hero.style.setProperty('--film-opacity', (filmOpacity * (1 - smoothstep((progress - 0.82) / 0.06))).toFixed(4));
    hero.style.setProperty('--intro-opacity', introOpacity.toFixed(4));
    hero.style.setProperty('--intro-shift', `${((1 - introOpacity) * -18).toFixed(2)}px`);
    hero.style.setProperty('--intro-blur', `${((1 - introOpacity) * 5).toFixed(2)}px`);
    hero.style.setProperty('--story-opacity', storyOpacity.toFixed(4));

    chapters.forEach((chapter, index) => {
      chapter.toggleAttribute('data-active', index === chapterIndex);
    });

    const actionsHidden = progress > 0.19;
    heroActions?.toggleAttribute('inert', actionsHidden);
    heroActions?.toggleAttribute('aria-hidden', actionsHidden);

    if (duration > 0) {
      targetTime = Math.min(duration - 0.04, progress * duration);
      seek();
    }
    if (progress !== destination) schedule();
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(render);
  };

  const enable = async () => {
    duration = Number.isFinite(video.duration) ? video.duration : 0;
    if (!duration) return;
    try {
      await Promise.all([cyborg?.decode(), bullseye?.decode()]);
    } catch {
      // Preserve the original, usable portrait if the transformation asset fails.
      return;
    }
    if (reduceMotion.matches) return;
    hero.classList.add('is-ready');
    video.pause();
    schedule();
  };

  video.addEventListener('seeked', () => { decodedTime = video.currentTime; seek(); schedule(); });
  video.preload = 'auto';
  if (video.readyState >= 2) enable();
  else video.addEventListener('loadeddata', enable, { once: true });

  const reset = () => {
    hero.classList.remove('is-ready');
    hero.removeAttribute('style');
    cyborg?.style.removeProperty('opacity');
    bullseye?.style.removeProperty('opacity');
    heroActions?.removeAttribute('inert');
    heroActions?.removeAttribute('aria-hidden');
    video.pause();
    progress = 0;
  };
  video.addEventListener('error', reset, { once: true });
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) reset(); else enable(); });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
}
