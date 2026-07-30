import { AnimationSpec } from "./types";

export const ANIMATION_PRESETS: AnimationSpec[] = [
  {
    id: "fade-reveal",
    name: "Fade Reveal",
    category: "entrance",
    description: "Standard opacity fade-in used for secondary content blocks.",
    duration: 0.3,
    delay: 0,
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    recommendedUsage: ["Card lists", "Muted content blocks"],
    accessibilityNotes: "Conforms to reduced motion overrides instantly."
  },
  {
    id: "scale-spring",
    name: "Scale Spring",
    category: "hover",
    description: "Elastic scaling micro-interaction utilizing spring damping curves.",
    duration: 0.4,
    delay: 0,
    spring: { stiffness: 300, damping: 20, mass: 1 },
    recommendedUsage: ["Interactive avatars", "Grid items"],
    accessibilityNotes: "Maintains clear focus boundary boundaries."
  },
  {
    id: "slide-left",
    name: "Slide Left Reveal",
    category: "entrance",
    description: "Left-to-right sliding translation used for sidebar sheets.",
    duration: 0.4,
    delay: 0,
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    recommendedUsage: ["Overlay sidebars", "Preference drawers"],
    accessibilityNotes: "Ensure keyboard focus shifts into drawer after animation completes."
  },
  {
    id: "spinner-infinite",
    name: "Linear Spinner",
    category: "loading",
    description: "Infinite linear rotation for loading indicators.",
    duration: 1.0,
    delay: 0,
    ease: "linear",
    recommendedUsage: ["Status progress circles", "Async request placeholders"],
    accessibilityNotes: "Use standard aria-live='polite' label alongside loading circles."
  },
  {
    id: "magnetic-drag",
    name: "Magnetic Drag",
    category: "gesture",
    description: "Cursor-following magnetic interaction for high-end call-to-actions.",
    duration: 0.5,
    delay: 0,
    spring: { stiffness: 150, damping: 15, mass: 0.8 },
    recommendedUsage: ["Floating actions", "Primary brand buttons"],
    accessibilityNotes: "Always provide static touch options for screen readers."
  }
];
