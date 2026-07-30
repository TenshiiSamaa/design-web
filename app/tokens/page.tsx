"use client";

import React, { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Card, Separator } from "@/components/ui";
import Link from "next/link";

interface TokenSpec {
  name: string;
  value: string;
  desc: string;
}

export default function TokensPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const tokensList: Record<string, TokenSpec[]> = {
    spacing: [
      { name: "--spacing-xs", value: "4px", desc: "For micro margins and gaps." },
      { name: "--spacing-sm", value: "8px", desc: "For label text spacing and padding." },
      { name: "--spacing-md", value: "16px", desc: "Standard component card padding." }
    ],
    radius: [
      { name: "--radius-xs", value: "4px", desc: "For badges and small checkboxes." },
      { name: "--radius-sm", value: "8px", desc: "For forms input corners." },
      { name: "--radius-md", value: "12px", desc: "For visual panel cards." }
    ]
  };

  const handleCopy = (name: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)] text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Design Tokens Catalog</h1>
          <p className="text-xs text-[var(--muted-foreground)]">Browse primitive design variables compiled dynamically from active theme presets.</p>
        </div>
      </div>

      {/* Grid of Tokens */}
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(tokensList).map(([category, items]) => (
          <Card key={category} className="p-6 border-[var(--border)] bg-[var(--surface)]/30 space-y-4">
            <h3 className="font-bold text-sm capitalize text-[var(--primary)]">{category} Scale Tokens</h3>
            <Separator />
            <div className="space-y-3.5">
              {items.map((token) => (
                <div key={token.name} className="flex justify-between items-center text-xs border-b border-[var(--border)]/30 pb-2 last:border-0 last:pb-0">
                  <div className="space-y-0.5">
                    <code className="bg-[var(--background)] px-2 py-0.5 rounded text-[10px] border border-[var(--border)] font-mono text-[var(--foreground)]">{token.name}</code>
                    <span className="text-[10px] text-[var(--muted-foreground)] block">{token.desc}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[var(--primary)]">{token.value}</span>
                    <button
                      onClick={() => handleCopy(token.name, token.value)}
                      className="text-[var(--primary)] hover:underline flex items-center cursor-pointer"
                    >
                      {copiedToken === token.name ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
