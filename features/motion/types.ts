export interface SpringPhysics {
  stiffness: number;
  damping: number;
  mass: number;
  velocity?: number;
}

export interface AnimationSpec {
  id: string;
  name: string;
  category:
    | "entrance"
    | "exit"
    | "hover"
    | "focus"
    | "active"
    | "loading"
    | "gesture"
    | "page";
  description: string;
  duration: number;
  delay: number;
  ease?: string;
  spring?: SpringPhysics;
  recommendedUsage: string[];
  accessibilityNotes: string;
}
