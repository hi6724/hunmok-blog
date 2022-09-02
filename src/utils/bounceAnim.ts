export const bounceAnim = {
  opacity: 1,
  duration: 0.3,
  keyframes: {
    y: [0, -20, 0],
    scale: [0.75, 1.15, 1],
    easeEach: "power2.inOut",
  },
  stagger: {
    each: 0.1,
  },
};
