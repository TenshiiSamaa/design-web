import React from "react";
import { ComponentShowcase } from "../../types";
import { Badge } from "@/components/ui/badge";

export const badgeShowcase: ComponentShowcase = {
  id: "badge",
  name: "Badge",
  category: "data-display",
  description: "Small status counters or label tags for filters and version details.",
  accessibilityScore: 92,
  qualityBadge: "production",
  ariaInfo: "Typically read as inline static text. If indicating a state change, use live regions (aria-live).",
  keyboardNav: [
    "None: Badges are non-interactive design markers."
  ],
  designNotes: "Designed using font-mono, with border radius scales mapping to full pill values.",
  bestPractices: [
    "Keep text labels brief (1-2 words).",
    "Use appropriate status colors (success, error, warning)."
  ],
  antiPatterns: [
    "Do not map click triggers to badges. Use buttons or tabs instead.",
    "Do not put paragraphs of text inside badge tags."
  ],
  props: [
    { name: "variant", type: "'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error'", default: "'default'", description: "Color style groupings." }
  ],
  variants: [
    {
      name: "Default Badge",
      description: "Standard gray badge.",
      props: { variant: "default" },
      render: (props) => <Badge variant="default" {...props}>Version 1.0</Badge>
    },
    {
      name: "Success Badge",
      description: "Green status indicator.",
      props: { variant: "success" },
      render: (props) => <Badge variant="success" {...props}>Active</Badge>
    },
    {
      name: "Warning Badge",
      description: "Amber status indicator.",
      props: { variant: "warning" },
      render: (props) => <Badge variant="warning" {...props}>Pending</Badge>
    },
    {
      name: "Error Badge",
      description: "Red critical status indicator.",
      props: { variant: "error" },
      render: (props) => <Badge variant="error" {...props}>Failed</Badge>
    }
  ]
};
