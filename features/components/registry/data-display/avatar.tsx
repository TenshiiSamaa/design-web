import React from "react";
import { ComponentShowcase } from "../../types";
import { Avatar } from "@/components/ui/avatar";

export const avatarShowcase: ComponentShowcase = {
  id: "avatar",
  name: "Avatar",
  category: "data-display",
  description: "User profile pictures with automated text fallbacks and border styles.",
  accessibilityScore: 95,
  qualityBadge: "production",
  ariaInfo: "Always provide an alt description for screen readers, or leave empty if decorative.",
  keyboardNav: [
    "None: Avatars are static display elements unless wrapped in a link/button."
  ],
  designNotes: "Supports circular crop layouts, custom sizing scales, and background fallbacks.",
  bestPractices: [
    "Always provide a fallback string (usually initials) in case the image fails to load.",
    "Ensure the image aspect ratio is square."
  ],
  antiPatterns: [
    "Do not use low contrast fallbacks.",
    "Avoid non-square profile images."
  ],
  props: [
    { name: "src", type: "string", default: "undefined", description: "Source URL for the profile image." },
    { name: "alt", type: "string", default: "'Avatar'", description: "Screen reader description." },
    { name: "fallback", type: "string", default: "undefined", description: "Fallback text (initials) shown if image fails." }
  ],
  variants: [
    {
      name: "Standard Profile Picture",
      description: "Default user avatar displaying profile image.",
      props: { 
        src: "https://raw.githubusercontent.com/TenshiiSamaa/My-Media/refs/heads/main/media/bot/pp%20mahiru%20shiina.jpg",
        alt: "Mahiru Shiina Profile",
        fallback: "MS"
      },
      render: (props) => <Avatar {...props} />
    },
    {
      name: "Fallback Initials",
      description: "Avatar showing text fallback when src is missing or invalid.",
      props: { 
        fallback: "MS"
      },
      render: (props) => <Avatar {...props} />
    }
  ]
};
