import React from "react";
import { ComponentShowcase } from "../../types";
import { Button } from "@/components/ui/button";

export const buttonShowcase: ComponentShowcase = {
  id: "button",
  name: "Button",
  category: "core",
  description: "Primary triggers for user actions, form submissions, and page navigation.",
  accessibilityScore: 98,
  qualityBadge: "production",
  ariaInfo: "Uses standard HTML <button> attributes. Supported attributes include aria-disabled, aria-label, and aria-describedby.",
  keyboardNav: [
    "Tab: Focus the button element.",
    "Space/Enter: Activate the trigger button."
  ],
  designNotes: "Maintain clear action copy. Visual hierarchies (Primary vs Outline) guide focus flow.",
  bestPractices: [
    "Limit to a single primary action per viewport context.",
    "Use direct action verbs (e.g. Save, Send, Discard)."
  ],
  antiPatterns: [
    "Do not use generic labels like 'Submit' when descriptive verbs are available.",
    "Do not style paragraph links to look identical to high-contrast button actions."
  ],
  props: [
    { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", default: "'primary'", description: "Adjusts action colors and style boundaries." },
    { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Sizing multiplier (padding and font heights)." },
    { name: "disabled", type: "boolean", default: "false", description: "Dims opacity and halts interactive state handlers." },
    { name: "loading", type: "boolean", default: "false", description: "Displays animated loading indicator and halts interaction." }
  ],
  variants: [
    {
      name: "Primary Action",
      description: "Highest contrast action trigger.",
      props: { variant: "primary" },
      render: (props) => <Button variant="primary" {...props}>Primary Action</Button>
    },
    {
      name: "Secondary",
      description: "Lower contrast supporting button.",
      props: { variant: "secondary" },
      render: (props) => <Button variant="secondary" {...props}>Secondary Action</Button>
    },
    {
      name: "Outline Panel",
      description: "Standard bordered trigger.",
      props: { variant: "outline" },
      render: (props) => <Button variant="outline" {...props}>Outline Action</Button>
    },
    {
      name: "Ghost trigger",
      description: "Text-only subtle action link.",
      props: { variant: "ghost" },
      render: (props) => <Button variant="ghost" {...props}>Ghost Action</Button>
    }
  ]
};
