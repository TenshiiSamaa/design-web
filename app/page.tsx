"use client";

import React from "react";
import { 
  ArrowRight, Shield, Sliders, Palette, Layout, Image, BarChart2, Zap, LayoutGrid, Clipboard 
} from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-16 text-[var(--foreground)] text-left">
      
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6 flex flex-col items-center justify-center border-b border-[var(--border)] border-dashed">
        <Badge variant="outline" className="border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)] text-xs py-1 px-3">
          Product Launch: Version 2.0 Stable
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl text-center">
          Design Web
        </h1>
        <p className="text-sm md:text-base text-[var(--muted-foreground)] max-w-lg leading-relaxed text-center">
          The professional developer platform for building high-contrast themes, component catalogs, responsive compose blocks, SVG libraries, and data graphics.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            href="/theme-studio" 
            className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold px-6 py-2.5 rounded-lg hover:scale-102 transition-transform cursor-pointer select-none"
          >
            Launch Theme Studio
          </Link>
          <a 
            href="#modules" 
            className="border border-[var(--border)] text-[var(--foreground)] text-xs font-bold px-6 py-2.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface)]/80 transition-colors select-none cursor-pointer"
          >
            Explore Modules Directory
          </a>
        </div>
      </section>

      {/* Modules Catalog Directory */}
      <section id="modules" className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Active Platform Modules</h2>
          <p className="text-xs text-[var(--muted-foreground)]">Browse decoupled architectural labs mapping typography, motion presets, and charts.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Theme Studio", desc: "Interactive theme playground, viewport size visualizers, and luminance audits.", link: "/theme-studio", icon: Sliders },
            { title: "Palette Studio", desc: "Color system workspace, dynamic scales builders, and WCAG AA contrast checkers.", link: "/palettes", icon: Palette },
            { title: "Component Library", desc: "Atomic UI gallery, buttons, badges, selectors, alerts, and accordions.", link: "/components", icon: LayoutGrid },
            { title: "Template Library", desc: "SaaS landing page composites composed sequentially from atomic layout blocks.", link: "/templates", icon: Layout },
            { title: "Asset Library", desc: "Scale SVG icons registries, base64 compilation, and mesh gradient pickers.", link: "/assets", icon: Image },
            { title: "Data Visualization Charts", desc: "Responsive Area and Bar graphics adaptation to css variables presets.", link: "/charts", icon: BarChart2 },
            { title: "Motion Studio", desc: "Visualizer playground for preset duration curves and spring physics cards.", link: "/motion", icon: Zap },
            { title: "Accessibility Center", desc: "Automated scan outlines validating ARIA targets and touch boundaries.", link: "/accessibility", icon: Shield },
            { title: "Forms Studio", desc: "Form builder builder appending text/email inputs and Zod validations.", link: "/forms", icon: Clipboard }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link key={idx} href={mod.link}>
                <Card className="p-5 border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all flex flex-col justify-between h-44 text-left group">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:scale-105 transition-transform">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[9px] uppercase tracking-wider font-mono text-[var(--muted-foreground)]">Enabled</span>
                    </div>
                    <h3 className="font-bold text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{mod.title}</h3>
                    <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">{mod.desc}</p>
                  </div>
                  <span className="text-[10px] text-[var(--primary)] font-bold flex items-center gap-1 hover:underline pt-2">
                    Launch Module <ArrowRight className="h-3 w-3" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="grid sm:grid-cols-3 gap-6 border-t border-[var(--border)] pt-12">
        <div className="space-y-1">
          <span className="text-2xl font-black text-[var(--foreground)] font-mono">50+</span>
          <span className="text-xs text-[var(--muted-foreground)] block font-semibold uppercase tracking-wider">Curated Palettes</span>
        </div>
        <div className="space-y-1">
          <span className="text-2xl font-black text-[var(--foreground)] font-mono">100%</span>
          <span className="text-xs text-[var(--muted-foreground)] block font-semibold uppercase tracking-wider">A11y Compliant</span>
        </div>
        <div className="space-y-1">
          <span className="text-2xl font-black text-[var(--foreground)] font-mono">16ms</span>
          <span className="text-xs text-[var(--muted-foreground)] block font-semibold uppercase tracking-wider">Luminance Swapping</span>
        </div>
      </section>
    </main>
  );
}
