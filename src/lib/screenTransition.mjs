const duration = 0.7;

const forwardAnimation = {
  old: {
    name: "none",
    duration: `${duration}s`,
    easing: "ease-in-out",
  },
  new: {
    name: "slide-in-right",
    duration: `${duration}s`,
    easing: "ease-in-out",
  },
};

const backwardAnimation = {
  old: {
    name: "none",
    duration: `${duration}s`,
    easing: "ease-in-out",
  },
  new: {
    name: "slide-in-left",
    duration: `${duration}s`,
    easing: "ease-in-out",
  },
};

const homeAnimation = {
  old: {
    name: "none",
    duration: `${duration}s`,
    easing: "ease-in-out",
  },
  new: {
    name: "slide-in-top",
    duration: `${duration}s`,
    easing: "ease-in-out",
  },
};

export const screenTransition = {
  forwards: forwardAnimation,
  backwards: backwardAnimation,
};

export const homeTransition = {
  forwards: homeAnimation,
  backwards: homeAnimation,
};
