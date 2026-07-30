"use client";

import React, { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui";
import Link from "next/link";

export default function ExportCenterPage() {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const exportsMap: Record<string, string> = {
    tailwind: `// tailwind.config.js presets\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: "var(--primary)",\n        background: "var(--background)",\n        border: "var(--border)",\n      }\n    }\n  }\n};`,
    scss: `// SCSS Variables tokens mapping\n$primary-color: var(--primary);\n$border-color: var(--border);\n$background-color: var(--background);`,
    figma: `{\n  "colors": {\n    "primary": { "type": "color", "value": "{var(--primary)}" },\n    "border": { "type": "color", "value": "{var(--border)}" }\n  }\n}`
  };

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedFormat(key);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)] text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Export Center</h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Compile and export design token configurations into multiple formats.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(exportsMap).map(([key, code]) => (
          <Card key={key} className="p-5 border-[var(--border)] bg-[var(--surface)]/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs uppercase tracking-wider text-[var(--primary)] font-mono">{key} Spec</span>
              <button
                onClick={() => handleCopy(key, code)}
                className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-bold text-[10px]"
              >
                {copiedFormat === key ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copiedFormat === key ? "Copied!" : "Copy Code"}
              </button>
            </div>
            
            <pre className="text-[10px] font-mono bg-[var(--background)] p-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] overflow-x-auto max-h-[160px] overflow-y-auto leading-relaxed">
              {code}
            </pre>
          </Card>
        ))}
      </div>
    </main>
  );
}
