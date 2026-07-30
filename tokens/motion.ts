import { duration } from "./duration";
import { easing } from "./easing";
import { transition } from "./transition";

/**
 * MOTION CONFIGURATION PRESETS
 * 
 * Aggregates duration, easing, and transition configurations
 */
export const motion = {
  duration,
  easing,
  transition,
  
  // Motion curve presets for components
  presets: {
    hover: {
      transition: transition.primitive.all,
      duration: duration.semantic.fast,
      easing: easing.semantic.standard
    },
    press: {
      transition: transition.primitive.transform,
      duration: duration.primitive[75],
      easing: easing.primitive.linear
    },
    spring: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 1
    },
    reveal: {
      transition: `${transition.primitive.opacity}, ${transition.primitive.transform}`,
      duration: duration.semantic.normal,
      easing: easing.semantic.smooth
    },
    stagger: {
      delayChildren: 0.05,
      staggerChildren: 0.03
    }
  }
};
export type MotionTokens = typeof motion;
