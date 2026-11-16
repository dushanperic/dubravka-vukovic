import type { TransitionBeforePreparationEvent } from 'astro:transitions/client';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DURATION_MS = 380;
const EASING_IN = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EASING_OUT = 'cubic-bezier(0.7, 0, 0.84, 0)';

let isTransitioning = false;

function getCurtain(): HTMLElement | null {
  return document.getElementById('page-curtain');
}

function initCurtain() {
  document.addEventListener('astro:before-preparation', (ev) => {
    const curtain = getCurtain();
    if (!curtain || prefersReducedMotion()) return;

    const event = ev as TransitionBeforePreparationEvent;
    const originalLoader = event.loader;

    isTransitioning = true;

    // Cancel any running animations to avoid stutter/conflicts
    curtain.getAnimations().forEach((anim) => anim.cancel());

    // Phase 1: Slide UP from bottom to cover the screen
    const animIn = curtain.animate(
      [
        { transform: 'translateY(100%)' },
        { transform: 'translateY(0%)' },
      ],
      {
        duration: DURATION_MS,
        easing: EASING_IN,
        fill: 'forwards',
      },
    );

    // Run native page fetch and curtain slide-in in parallel
    event.loader = async () => {
      await Promise.all([originalLoader(), animIn.finished]);
    };
  });

  // Phase 2: Once the new page is fully loaded and mounted, slide UPWARD off the top
  document.addEventListener('astro:page-load', async () => {
    if (!isTransitioning) return;
    isTransitioning = false;

    const curtain = getCurtain();
    if (!curtain || prefersReducedMotion()) return;

    // Slide upward out of the screen, revealing the new page underneath
    const animOut = curtain.animate(
      [
        { transform: 'translateY(0%)' },
        { transform: 'translateY(-100%)' },
      ],
      {
        duration: DURATION_MS,
        easing: EASING_OUT,
        fill: 'forwards',
      },
    );

    await animOut.finished;

    // Phase 3: Cancel animation and silently reset to bottom floor out of view
    animOut.cancel();
    curtain.style.transform = 'translateY(100%)';
  });
}

initCurtain();
