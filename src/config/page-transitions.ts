const pageTransitionAnimation = {
  old: {
    name: 'slideOutToLeft',
    duration: '0.3s',
    easing: 'ease-in-out',
    fillMode: 'forwards',
  },
  new: {
    name: 'slideInFromRight',
    duration: '0.3s',
    easing: 'ease-in-out',
    fillMode: 'backwards',
  },
};

export const pageTransition = {
  forwards: pageTransitionAnimation,
  backwards: pageTransitionAnimation,
};
