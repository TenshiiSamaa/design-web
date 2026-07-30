"use client";

import React, { useState } from "react";
import { 
  Sliders, Laptop, Tablet, Smartphone, Monitor, LayoutGrid, CheckCircle, 
  AlertCircle, ArrowRight, Star, ChevronDown
} from "lucide-react";
import { Card, Badge, Button, Separator } from "@/components/ui";
import { ThemeInspector } from "@/themes";
import { useTestingTheme } from "@/providers/theme-provider";

type ViewportMode = "desktop" | "ultrawide" | "laptop" | "tablet" | "mobile";

export default function Home() {
  useTestingTheme();
  
  // Playground state
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<"ui" | "blocks" | "metrics">("ui");
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);
  const [showModalDemo, setShowModalDemo] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  // Match viewport mode to widths
  const viewportWidthClass = {
    desktop: "w-[1280px] shrink-0",
    ultrawide: "w-[1600px] shrink-0",
    laptop: "w-[1024px] shrink-0",
    tablet: "w-[768px] shrink-0",
    mobile: "w-full max-w-full lg:w-full lg:max-w-[375px] lg:shrink"
  }[viewport];

  return (
    <main className="flex-1 p-3 md:p-6 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[var(--primary)]" />
            Interactive Theme Playground
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Evaluate design system components, evaluate contrast readability, and preview viewports live.
          </p>
        </div>

        {/* Viewport Control Segmented Selector */}
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] self-start">
          <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] px-2">Viewport</span>
          {([
            { id: "mobile", icon: Smartphone, label: "Mobile" },
            { id: "tablet", icon: Tablet, label: "Tablet" },
            { id: "laptop", icon: Laptop, label: "Laptop" },
            { id: "desktop", icon: Monitor, label: "Desktop" },
            { id: "ultrawide", icon: LayoutGrid, label: "Ultra" }
          ] as { id: ViewportMode; icon: React.ComponentType<{ className?: string }>; label: string }[]).map((v) => {
            const Icon = v.icon;
            const isActive = viewport === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setViewport(v.id)}
                title={`Switch view to ${v.label}`}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Preview, Right Inspector */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Preview Viewport container (takes 8 cols) */}
        <div className="lg:col-span-8 space-y-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-2 shrink-0">
            <div className="flex gap-4 text-xs font-semibold select-none overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none">
              {([
                { id: "ui", label: "Core UI Elements" },
                { id: "blocks", label: "Marketing Components" },
                { id: "metrics", label: "System Metrics" }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveShowcaseTab(tab.id)}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeShowcaseTab === tab.id
                      ? "border-[var(--primary)] text-[var(--primary)] font-bold"
                      : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">
              Width: {viewport === "desktop" ? "Responsive" : viewportWidthClass.match(/\d+px/)?.[0] || "Full"}
            </span>
          </div>

          {/* Dynamic viewport sizing container */}
          <div className="w-full overflow-x-auto bg-[var(--background)]/30 rounded-xl border border-[var(--border)] border-dashed p-1.5 sm:p-4 min-h-[400px] sm:min-h-[500px] scrollbar-thin">
            <div className={`transition-all duration-300 ease-in-out ${viewportWidthClass} min-w-0 mx-auto space-y-6 sm:space-y-8 bg-[var(--background)] p-3.5 sm:p-6 rounded-xl border border-[var(--border)] shadow-sm relative overflow-hidden`}>
              
              {/* ────────────────────────────────────────────────────────────
                  TAB 1: CORE UI SHOWCASE
                  ──────────────────────────────────────────────────────────── */}
              {activeShowcaseTab === "ui" && (
                <div className="space-y-8">
                  {/* Buttons & Badges */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Buttons & Badges</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary">Primary CTA</Button>
                      <Button variant="secondary">Secondary Button</Button>
                      <Button variant="outline">Outline Panel</Button>
                      <Button variant="ghost" size="sm">Ghost Link</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <Badge variant="success">Active</Badge>
                      <Badge variant="warning">Revision Needed</Badge>
                      <Badge variant="error">Critical Error</Badge>
                      <Badge variant="secondary">v1.0.0</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-2.5 w-2.5 fill-current text-[var(--warning)]" /> Featured
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Forms & Switches */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Form Inputs</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[var(--foreground)]">Developer Name</label>
                        <input
                          type="text"
                          placeholder="Jane Doe"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none text-[var(--foreground)]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[var(--foreground)]">Validation State</label>
                        <div className="relative">
                          <input
                            type="text"
                            value="invalid_entry@domain"
                            readOnly
                            className="w-full text-xs pl-3 pr-8 py-2 rounded-lg border border-[var(--destructive)]/50 bg-[var(--surface)] text-[var(--destructive)] focus:outline-none"
                          />
                          <AlertCircle className="h-3.5 w-3.5 text-[var(--destructive)] absolute right-2.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-4 w-4"
                        />
                        <span>Enable dynamic scaling multiplier</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
                        <input
                          type="checkbox"
                          checked={showModalDemo}
                          onChange={(e) => setShowModalDemo(e.target.checked)}
                          className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-4 w-4"
                        />
                        <span>Launch confirmation Modal overlay</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  {/* Feedback Blocks */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">System Alerts</h3>
                    <div className="p-4 rounded-xl border border-[var(--destructive)]/20 bg-[var(--destructive)]/5 text-[var(--destructive)] flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="font-bold text-xs">Security Advisory</h5>
                        <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
                          Your theme is currently utilizing an unvalidated custom color spectrum. Check accessibility ratios inside the Inspector panel before publishing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Accordion & Accordions panels */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Widgets (Accordion & List)</h3>
                    <div className="border border-[var(--border)] rounded-xl overflow-hidden divide-y divide-[var(--border)]">
                      {[
                        { title: "What is the token compilation latency?", content: "All color conversions are calculated dynamically inside the theme provider react loops. Switching preset configs takes less than 16ms, causing zero layout shifting or flickering." },
                        { title: "Are these configurations WCAG AA approved?", content: "Yes. Every palette registered inside Batch 1 undergoes mathematical contrast evaluation. Interactive foregrounds and buttons have ratios exceeding 4.5:1." }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[var(--background)]">
                          <button
                            onClick={() => setAccordionOpen(accordionOpen === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-3.5 text-xs font-semibold text-left cursor-pointer text-[var(--foreground)] hover:bg-[var(--surface)]/50"
                          >
                            <span>{item.title}</span>
                            <ChevronDown className={`h-4.5 w-4.5 text-[var(--muted-foreground)] transition-transform duration-200 ${accordionOpen === idx ? "rotate-180" : ""}`} />
                          </button>
                          {accordionOpen === idx && (
                            <div className="p-3.5 pt-0 text-xs text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)]/30">
                              {item.content}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  TAB 2: MARKETING SHOWCASE
                  ──────────────────────────────────────────────────────────── */}
              {activeShowcaseTab === "blocks" && (
                <div className="space-y-8">
                  {/* Hero Block */}
                  <div className="text-center space-y-4 py-6 flex flex-col items-center justify-center">
                    <Badge variant="outline" className="border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)]">
                      SaaS Template
                    </Badge>
                    <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] max-w-lg leading-tight text-center">
                      Architecting beautiful, high-contrast user interfaces.
                    </h1>
                    <p className="text-xs text-[var(--muted-foreground)] max-w-sm leading-relaxed text-center">
                      Build faster with automated tokens mapping, spring transition physics, and WCAG evaluation engines.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Button variant="primary">Deploy Application</Button>
                      <Button variant="outline" className="flex items-center gap-1.5">
                        Read Docs <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Cards Grid */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Pricing Tiers</h3>
                    <div className={`grid gap-4 ${
                      (viewport === "mobile" || viewport === "tablet") ? "grid-cols-1" : "grid-cols-2"
                    }`}>
                      {/* Premium Card */}
                      <Card className="p-5 border-[var(--primary)]/30 bg-[var(--primary)]/[0.02] flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs text-[var(--primary)]">Pro Developer</span>
                            <Badge variant="success" className="text-[9px]">Best Value</Badge>
                          </div>
                          <div>
                            <span className="text-2xl font-black text-[var(--foreground)]">$29</span>
                            <span className="text-xs text-[var(--muted-foreground)]">/month</span>
                          </div>
                          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                            For designers and developers who require visual telemetry.
                          </p>
                        </div>
                        <Button variant="primary" className="w-full h-auto min-h-10 py-2.5 px-3">Get Started Now</Button>
                      </Card>

                      {/* Standard Card */}
                      <Card className="p-5 border-[var(--border)] bg-[var(--background)] flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <span className="font-bold text-xs text-[var(--foreground)]">Free Sandbox</span>
                          <div>
                            <span className="text-2xl font-black text-[var(--foreground)]">$0</span>
                            <span className="text-xs text-[var(--muted-foreground)]">/forever</span>
                          </div>
                          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                            Full access to basic color primitives and visual layout sandboxes.
                          </p>
                        </div>
                        <Button variant="outline" className="w-full h-auto min-h-10 py-2.5 px-3">Initialize Sandbox</Button>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  {/* Timeline widget */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Project Timeline</h3>
                    <div className="relative border-l border-[var(--border)] ml-3 pl-4 space-y-5 py-2">
                      {[
                        { title: "Stage 01: Token Engine Base", date: "July 2026", desc: "Decoupled 20+ modular design token scripts into primitives, semantic layers, and indexes." },
                        { title: "Stage 02: 50 Color Palettes", date: "July 2026", desc: "Organized 50 palettes in subdirectories compiled automatically during builds." },
                        { title: "Stage 03: Variables Mapping Engine", date: "July 2026", desc: "Constructed relative luminance calculations and dynamic variables injections." }
                      ].map((item, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[var(--primary)] border-2 border-[var(--background)]" />
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-[var(--muted-foreground)] font-mono block">{item.date}</span>
                            <h5 className="font-bold text-xs text-[var(--foreground)]">{item.title}</h5>
                            <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ────────────────────────────────────────────────────────────
                  TAB 3: SYSTEM METRICS & CHART TELEMETRY
                  ──────────────────────────────────────────────────────────── */}
              {activeShowcaseTab === "metrics" && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[var(--foreground)]">Telemetry Analytics</h4>
                    <p className="text-xs text-[var(--muted-foreground)]">System resource response delay statistics styled via variables mapping.</p>
                  </div>

                  {/* Interactive Chart */}
                  <div className="h-48 border border-[var(--border)] rounded-xl p-4 bg-[var(--background)] flex items-end justify-between gap-2.5">
                    {[65, 45, 90, 30, 80, 50, 75, 40, 85, 60].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div className="text-[9px] font-mono text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity">
                          {val}ms
                        </div>
                        {/* Bar styled dynamically via --chart-1 etc */}
                        <div 
                          className="w-full rounded-t-md transition-all duration-300 cursor-pointer"
                          style={{ 
                            height: `${val}%`, 
                            backgroundColor: idx % 3 === 0 ? "var(--chart-1)" : idx % 3 === 1 ? "var(--chart-2)" : "var(--chart-3)"
                          }}
                        />
                        <span className="text-[8px] font-mono text-[var(--muted-foreground)] mt-1">D{idx+1}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Standard Data Table */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Palette Registry Records</h3>
                     <div className="border border-[var(--border)] rounded-xl overflow-hidden">
                      <div className="overflow-x-auto w-full scrollbar-thin">
                        <table className="w-full text-xs text-left border-collapse min-w-[500px]">
                          <thead>
                            <tr className="bg-[var(--table-header)]/50 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                              <th className="p-3">Palette Name</th>
                              <th className="p-3">Category</th>
                              <th className="p-3">Creator</th>
                              <th className="p-3 text-right">Contrast Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "Obsidian Violet", cat: "Professional", author: "System", score: "PASS AA" },
                              { name: "Snow Monochrome", cat: "Minimal", author: "Design Lab", score: "PASS AAA" },
                              { name: "Federal Navy", cat: "Corporate", author: "Banker", score: "PASS AA" }
                            ].map((row, i) => (
                              <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--table-row-hover)] bg-[var(--table-row)]">
                                <td className="p-3 font-semibold text-[var(--foreground)]">{row.name}</td>
                                <td className="p-3 text-[var(--muted-foreground)]">{row.cat}</td>
                                <td className="p-3 text-[var(--muted-foreground)]">{row.author}</td>
                                <td className="p-3 text-right">
                                  <Badge variant={row.score.includes("AAA") ? "success" : "success"} className="text-[9px] font-mono">
                                    {row.score}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Theme Inspector panel (takes 4 cols) */}
        <div className="lg:col-span-4 w-full">
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Telemetry & Audit</h2>
            <ThemeInspector />
          </div>
        </div>
      </div>

      {/* Dynamic Demo Confirmation Modal */}
      {showModalDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--overlay)] backdrop-blur-sm transition-all duration-300">
          <Card className="max-w-sm w-full p-6 space-y-4 border-[var(--border)] bg-[var(--background)] shadow-2xl relative">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              <CheckCircle className="h-5 w-5" />
              <h4 className="font-bold text-sm text-[var(--foreground)]">Workspace Sync Complete</h4>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Your runtime theme changes have been dynamically synchronized with local storage cache. All elements reflect new spacing, radius and contrast multipliers.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModalDemo(false)}>Discard</Button>
              <Button variant="primary" onClick={() => setShowModalDemo(false)}>Proceed</Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
