"use client";

import React, { use, useState, useMemo } from "react";
import { MARKETPLACE_FORMS } from "@/features/forms/registry";
import { ArrowLeft, AlertCircle, Cpu, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function FormDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [testValues, setTestValues] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeForm = useMemo(() => {
    return MARKETPLACE_FORMS.find((f) => f.slug === resolvedParams.slug);
  }, [resolvedParams.slug]);

  const validationErrors = useMemo(() => {
    if (!activeForm) return {};
    const errors: Record<string, string> = {};
    activeForm.fields.forEach((f) => {
      const val = testValues[f.id] || "";
      if (f.required && !val) {
        errors[f.id] = "Required field validation fails";
      }
      if (f.type === "email" && val && !val.includes("@")) {
        errors[f.id] = "Invalid email format";
      }
    });
    return errors;
  }, [activeForm, testValues]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  if (!activeForm) {
    return (
      <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-[var(--destructive)] mx-auto" />
        <h2 className="text-xl font-bold">Form Template Not Found</h2>
        <Link href="/forms" className="text-[var(--primary)] hover:underline block text-xs">Back to Forms</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/forms" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Forms Registry
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {activeForm.name}
            <Badge variant="secondary">{activeForm.category}</Badge>
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">{activeForm.description}</p>
        </div>

        {/* Telemetry info */}
        <Card className="px-4 py-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 flex items-center gap-2 shrink-0">
          <Cpu className="h-4 w-4 text-[var(--primary)]" />
          <div className="text-left">
            <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] block">A11y Compliance</span>
            <span className="text-sm font-black text-[var(--foreground)]">{activeForm.accessibilityScore}%</span>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Visual Preview form (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-8 bg-[var(--surface)]/20 border-[var(--border)] flex flex-col items-center justify-center min-h-[300px]">
            {isSubmitted ? (
              <div className="text-center p-6 space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 max-w-sm w-full">
                <CheckCircle className="h-10 w-10 mx-auto" />
                <h4 className="font-bold text-sm">Submission Successful</h4>
                <p className="text-xs text-emerald-500/80 leading-relaxed">Form fields payload complies with validation Zod contracts.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 max-w-sm w-full text-left">
                {activeForm.fields.map((f) => {
                  const error = validationErrors[f.id];
                  return (
                    <div key={f.id} className="space-y-1 text-xs">
                      <label className="font-semibold text-[var(--foreground)] block">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder || ""}
                        value={testValues[f.id] || ""}
                        onChange={(e) => setTestValues({ ...testValues, [f.id]: e.target.value })}
                        className={`w-full text-xs px-3 py-2 rounded-lg border bg-[var(--background)] text-[var(--foreground)] focus:outline-none ${
                          error ? "border-red-500 ring-1 ring-red-500" : "border-[var(--border)]"
                        }`}
                      />
                      {error && (
                        <div className="text-[10px] text-red-500 flex items-center gap-1.5 pt-0.5 font-medium">
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {error}
                        </div>
                      )}
                    </div>
                  );
                })}

                <button 
                  type="submit" 
                  disabled={Object.keys(validationErrors).length > 0}
                  className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Form payload
                </button>
              </form>
            )}
          </Card>
        </div>

        {/* Right column: Details and recommendations (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 space-y-4 text-left text-xs">
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider block">Form Metadata details</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Author</span>
                <span className="font-semibold">{activeForm.author}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Version</span>
                <span className="font-mono">{activeForm.version}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Created</span>
                <span>{activeForm.createdAt}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Dependencies</span>
                <span className="font-mono">{activeForm.dependencies.join(", ")}</span>
              </div>
            </div>
          </Card>

          {/* Guidelines */}
          <Card className="p-5 border-[var(--border)] bg-[var(--background)] space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Best Practices & Recommended Usage
            </h4>
            <ul className="text-xs space-y-2 text-[var(--foreground)] text-left">
              {activeForm.recommendedUsage.map((u, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
