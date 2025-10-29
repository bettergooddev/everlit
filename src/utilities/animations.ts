/*
 * Animation utilities used across blocks.
 *
 * Currently provides `fadeUpInView`, which returns the props to spread onto
 * a Motion One element for a slide-up / fade-in effect that triggers when the
 * element enters the viewport.
 */
export const fadeUpInView = (index: number, baseDelay = 0.2, duration = 0.6) => {
  return {
    initial: { y: 200, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
      delay: index * baseDelay,
    },
  }
}

export const popInInView = (
  index: number,
  baseDelay = 0.13,
  duration = 0.4,
  viewportAmount = 0.8,
) => {
  return {
    initial: { scale: 0.2, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, amount: viewportAmount },
    transition: {
      duration,
      ease: [0.17, 0.95, 0.38, 1] as [number, number, number, number],
      delay: index * baseDelay,
    },
  }
}

export const slideInFromLeftInView = (
  index: number,
  baseDelay = 0.2,
  duration = 0.6,
  distance = 200,
) => {
  return {
    initial: { x: -distance, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
      delay: index * baseDelay,
    },
  }
}

export const slideInFromRightInView = (
  index: number,
  baseDelay = 0.2,
  duration = 0.6,
  distance = 200,
) => {
  return {
    initial: { x: distance, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
      delay: index * baseDelay,
    },
  }
}
