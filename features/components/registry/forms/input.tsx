import React from "react";
import { ComponentShowcase } from "../../types";
import { Input } from "@/components/ui/input";

export const inputShowcase: ComponentShowcase = {
  id: "input",
  name: "Input",
  category: "forms",
  description: "Text field controls capturing values, email logins, passwords, or search queries.",
  accessibilityScore: 95,
  qualityBadge: "production",
  ariaInfo: "Requires association with a valid <label> element or aria-label attributes for accessibility screen readers.",
  keyboardNav: [
    "Tab: Focus the input control.",
    "Escape: Clear current typing focus."
  ],
  designNotes: "Binds outlines to --ring dynamic variable. Focus states trigger high-contrast borders.",
  bestPractices: [
    "Always provide associated label text or placeholder guides.",
    "Verify inputs widths align with the layout system density."
  ],
  antiPatterns: [
    "Do not remove focus outlines. Outlines are critical for visual accessibility.",
    "Avoid using placeholders as the sole label indicator."
  ],
  props: [
    { name: "type", type: "string", default: "'text'", description: "Standard HTML input types (email, text, password, date)." },
    { name: "placeholder", type: "string", default: "undefined", description: "Hint guide shown when input is blank." },
    { name: "disabled", type: "boolean", default: "false", description: "Dims opacity and locks form entry handlers." }
  ],
  variants: [
    {
      name: "Default Text Input",
      description: "Standard text field capturing strings.",
      props: { type: "text", placeholder: "Enter your username..." },
      render: (props) => <Input type="text" {...props} />
    },
    {
      name: "Password field",
      description: "Concealed string collector.",
      props: { type: "password", placeholder: "••••••••" },
      render: (props) => <Input type="password" {...props} />
    }
  ]
};
