import { LayoutTemplate, LayoutBlock } from "./types";

export const BLOCK_CATALOG: LayoutBlock[] = [
  {
    id: "catalog-hero",
    type: "hero",
    name: "Interactive Hero Section",
    title: "Revolutionize Your Design Stack",
    subtitle: "Build, test, and promoting components to production codebases in seconds.",
    styling: { paddingY: "lg", gap: "md", shadow: "none", radius: "none", border: false },
    visible: true
  },
  {
    id: "catalog-features",
    type: "features",
    name: "Features Grid",
    title: "Engineered For Speed",
    subtitle: "Everything you need to compile accessible web products.",
    styling: { paddingY: "md", gap: "lg", shadow: "sm", radius: "md", border: true },
    visible: true
  },
  {
    id: "catalog-pricing",
    type: "pricing",
    name: "Tiered Pricing Cards",
    title: "Pricing Tailored For Teams",
    subtitle: "Start free, upgrade when your team expands.",
    styling: { paddingY: "lg", gap: "lg", shadow: "md", radius: "lg", border: true },
    visible: true
  },
  {
    id: "catalog-faq",
    type: "faq",
    name: "FAQ Accordion",
    title: "Frequently Asked Questions",
    subtitle: "Got questions? We've got answers.",
    styling: { paddingY: "md", gap: "md", shadow: "none", radius: "md", border: false },
    visible: true
  }
];

export const STARTER_TEMPLATES: LayoutTemplate[] = [
  {
    id: "landing-page",
    name: "SaaS Landing Page",
    description: "High-converting layout template mapping Hero, Features, Pricing, and CTA blocks.",
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        name: "Interactive Hero Section",
        title: "Build the Future of User Interfaces",
        subtitle: "Integrated token engines, responsive viewport composition drawers, and automated WCAG checkers.",
        styling: { paddingY: "lg", gap: "md", shadow: "none", radius: "none", border: false },
        visible: true
      },
      {
        id: "features-1",
        type: "features",
        name: "Features Grid",
        title: "Next-Gen Features Suite",
        subtitle: "Dynamic spring physics, linter compilations, and static manifest registry builders.",
        styling: { paddingY: "md", gap: "lg", shadow: "sm", radius: "md", border: true },
        visible: true
      },
      {
        id: "pricing-1",
        type: "pricing",
        name: "Tiered Pricing Cards",
        title: "Flexible Plans",
        subtitle: "Pricing modules that scale directly with your pipeline consumption.",
        styling: { paddingY: "lg", gap: "lg", shadow: "md", radius: "lg", border: true },
        visible: true
      }
    ]
  },
  {
    id: "portfolio-page",
    name: "Developer Portfolio",
    description: "Compact structural layout suitable for displaying showcases and lists.",
    blocks: [
      {
        id: "hero-2",
        type: "hero",
        name: "Interactive Hero Section",
        title: "Hi, I am a Design Systems Engineer",
        subtitle: "I design professional theme engines and component libraries.",
        styling: { paddingY: "md", gap: "md", shadow: "none", radius: "none", border: false },
        visible: true
      },
      {
        id: "faq-1",
        type: "faq",
        name: "FAQ Accordion",
        title: "Frequently Asked Questions",
        subtitle: "Details on my code methodologies, templates, and integration contracts.",
        styling: { paddingY: "md", gap: "md", shadow: "none", radius: "md", border: false },
        visible: true
      }
    ]
  }
];

/**
 * Formats layout block array into clean JSX snippet
 */
export function compileToJsx(blocks: LayoutBlock[]): string {
  const codeBlocks = blocks
    .filter((b) => b.visible)
    .map((b) => {
      const paddingClass = b.styling.paddingY === "lg" ? "py-24" : b.styling.paddingY === "md" ? "py-12" : "py-6";
      const borderClass = b.styling.border ? "border border-[var(--border)]" : "";
      const shadowClass = b.styling.shadow !== "none" ? `shadow-${b.styling.shadow}` : "";
      
      return `      {/* ${b.name} */}
      <section className="${paddingClass} ${borderClass} ${shadowClass} bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <h2 className="text-2xl font-black text-[var(--foreground)]">${b.title}</h2>
          ${b.subtitle ? `<p className="text-sm text-[var(--muted-foreground)]">${b.subtitle}</p>` : ""}
        </div>
      </section>`;
    })
    .join("\n\n");

  return `import React from "react";\n\nexport default function CustomPage() {\n  return (\n    <main className="space-y-8 bg-[var(--background)]">\n${codeBlocks}\n    </main>\n  );\n}`;
}
