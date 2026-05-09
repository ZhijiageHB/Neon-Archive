export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 25 },
  smooth: { type: "spring" as const, stiffness: 200, damping: 22 },
  gentle: { type: "spring" as const, stiffness: 120, damping: 18 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
};

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: springs.smooth,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: springs.gentle,
};

export const stagger = {
  animate: { transition: { staggerChildren: 0.04 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: springs.smooth,
};
