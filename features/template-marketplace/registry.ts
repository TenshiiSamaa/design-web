import { BlockSpec, TemplateSpec } from "./types";

export const MARKETPLACE_BLOCKS: BlockSpec[] = [
  {
    id: "block-navbar",
    slug: "header-navigation-navbar",
    name: "Header Navigation Navbar",
    category: "Navbar",
    description: "Responsive top navigation layout displaying branding and tab navigation links.",
    version: "1.0.0",
    author: "Core Design Architect",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    responsive: true,
    darkMode: true,
    lightMode: true,
    motionSupport: true,
    accessibilityScore: 98,
    dependencies: ["lucide-react"],
    tags: ["Navigation", "Headers", "Sticky"],
    difficulty: "beginner",
    recommendedUsage: ["Landing pages", "Corporate web layouts"],
    relatedBlocks: ["block-footer"],
    codeSnippet: `import React from "react";\nimport { LayoutGrid, Zap } from "lucide-react";\n\nexport default function Navbar() {\n  return (\n    <nav className="w-full bg-[var(--surface)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between sticky top-0 z-50">\n      <div className="flex items-center gap-2 font-bold text-[var(--foreground)]">\n        <LayoutGrid className="h-5 w-5 text-[var(--primary)]" />\n        <span>DesignLab</span>\n      </div>\n      <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] font-semibold">\n        <a href="#features" className="hover:text-[var(--foreground)] transition-colors">Features</a>\n        <a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</a>\n      </div>\n      <button className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1">\n        <Zap className="h-3.5 w-3.5" /> Deploy App\n      </button>\n    </nav>\n  );\n}`
  },
  {
    id: "block-hero",
    slug: "interactive-hero-section",
    name: "Interactive Hero Section",
    category: "Hero",
    description: "Visually premium hero grid section built with bold titles and interactive triggers.",
    version: "1.0.0",
    author: "Core Design Architect",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    responsive: true,
    darkMode: true,
    lightMode: true,
    motionSupport: true,
    accessibilityScore: 96,
    dependencies: ["framer-motion"],
    tags: ["Hero", "Landings", "Intro"],
    difficulty: "intermediate",
    recommendedUsage: ["Primary landing fold", "SaaS introduction portals"],
    relatedBlocks: ["block-pricing"],
    codeSnippet: `import React from "react";\nimport { motion } from "framer-motion";\n\nexport default function HeroSection() {\n  return (\n    <section className="py-24 px-6 text-center bg-[var(--background)] text-[var(--foreground)]">\n      <div className="max-w-4xl mx-auto space-y-6">\n        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">\n          The Ultimate <span className="text-[var(--primary)]">Design Engine</span>\n        </h1>\n        <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">\n          Accelerate your production composition with real-time contrast checking and layouts composition sandbox.\n        </p>\n        <div className="flex justify-center gap-3 pt-4">\n          <button className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold px-5 py-2.5 rounded-lg shadow-lg hover:scale-102 transition-transform">\n            Get Started\n          </button>\n          <button className="bg-transparent border border-[var(--border)] text-[var(--foreground)] text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[var(--surface)] transition-colors">\n            Read Documentation\n          </button>\n        </div>\n      </div>\n    </section>\n  );\n}`
  },
  {
    id: "block-pricing",
    slug: "tiered-pricing-cards",
    name: "Tiered Pricing Cards",
    category: "Pricing",
    description: "Grid configuration displaying subscription tiers, feature checkboxes, and custom tags.",
    version: "1.0.0",
    author: "Core Design Architect",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    responsive: true,
    darkMode: true,
    lightMode: true,
    motionSupport: true,
    accessibilityScore: 95,
    dependencies: ["lucide-react"],
    tags: ["Pricing", "SaaS", "Cards"],
    difficulty: "intermediate",
    recommendedUsage: ["Pricing segments", "Plan selection drawers"],
    relatedBlocks: ["block-faq"],
    codeSnippet: `import React from "react";\nimport { Check } from "lucide-react";\n\nexport default function Pricing() {\n  return (\n    <section className="py-16 px-6 bg-[var(--background)]">\n      <div className="max-w-5xl mx-auto text-center space-y-12">\n        <div className="space-y-2">\n          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Simple Pricing Plans</h2>\n          <p className="text-xs text-[var(--muted-foreground)]">Pick the tier that fits your development pipeline.</p>\n        </div>\n        <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">\n          {/* Starter Plan */}\n          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 space-y-4">\n            <h3 className="font-bold text-lg text-[var(--foreground)]">Developer Standard</h3>\n            <div className="text-2xl font-black text-[var(--foreground)]">$0 <span className="text-xs font-normal text-[var(--muted-foreground)]">/ forever</span></div>\n            <ul className="text-xs text-[var(--muted-foreground)] space-y-2">\n              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[var(--primary)]" /> 5 Custom theme slots</li>\n              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[var(--primary)]" /> Standard accessibility scanner</li>\n            </ul>\n            <button className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold py-2 rounded-lg">Get Started</button>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n}`
  }
];

export const MARKETPLACE_TEMPLATES: TemplateSpec[] = [
  {
    id: "tpl-saas",
    slug: "saas-landing-page",
    name: "SaaS Product Landing Page",
    description: "Standard top-tier SaaS layout integrating core headers, high-converting interactive folds, pricing options, and FAQ sections.",
    category: "Landing Page",
    version: "1.0.0",
    author: "Core Design Architect",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    blocks: ["header-navigation-navbar", "interactive-hero-section", "tiered-pricing-cards"],
    tags: ["SaaS", "Startup", "Stripe Style"]
  }
];
