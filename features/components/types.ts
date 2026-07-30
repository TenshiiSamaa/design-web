import React from "react";

export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentVariant {
  name: string;
  description: string;
  props: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (props: any) => React.ReactNode;
}

export interface ComponentShowcase {
  id: string;
  name: string;
  category:
    | "core"
    | "forms"
    | "navigation"
    | "feedback"
    | "overlay"
    | "data-display"
    | "layout"
    | "marketing"
    | "charts";
  description: string;
  props: ComponentProp[];
  variants: ComponentVariant[];
  keyboardNav: string[];
  ariaInfo: string;
  accessibilityScore: number;
  qualityBadge: "production" | "experimental" | "deprecated";
  designNotes: string;
  bestPractices: string[];
  antiPatterns: string[];
  futureRoadmap?: string[];
}
