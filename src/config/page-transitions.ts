import type { TransitionAnimationPair } from 'astro';

const curtainAnimation: TransitionAnimationPair = {
  old: {
    name: 'curtainUpOut',
    duration: '0.6s',
    easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
    fillMode: 'both',
  },
  new: {
    name: 'curtainUpIn',
    duration: '0.6s',
    easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
    fillMode: 'both',
  },
};

export const curtainWipe = {
  forwards: curtainAnimation,
  backwards: curtainAnimation,
};
