export interface BlockStyling {
  paddingY: "sm" | "md" | "lg" | "none";
  gap: "sm" | "md" | "lg" | "none";
  shadow: "none" | "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
  border: boolean;
}

export interface LayoutBlock {
  id: string;
  type: "hero" | "features" | "pricing" | "faq" | "statistics" | "cta";
  name: string;
  title: string;
  subtitle?: string;
  styling: BlockStyling;
  visible: boolean;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  blocks: LayoutBlock[];
}
