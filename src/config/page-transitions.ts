import type {
  TransitionAnimationPair,
  TransitionDirectionalAnimations,
} from 'astro';

const forwardsAnimation: TransitionAnimationPair = {
  old: {
    name: 'curtainUpOut',
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fillMode: 'both',
  },
  new: {
    name: 'curtainUpIn',
    duration: '0.4s',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fillMode: 'both',
  },
};

const backwardsAnimation: TransitionAnimationPair = {
  old: {
    name: 'curtainDownOut',
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fillMode: 'both',
  },
  new: {
    name: 'curtainDownIn',
    duration: '0.4s',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fillMode: 'both',
  },
};

export const curtainWipe: TransitionDirectionalAnimations = {
  forwards: forwardsAnimation,
  backwards: backwardsAnimation,
};
