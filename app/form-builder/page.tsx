"use client";

import React, { useState, useMemo } from "react";
import { FORM_CATALOG_FIELDS, compileToZodSchema, compileToReactHookForm } from "@/features/forms/registry";
import { FormField } from "@/features/forms/types";
import { 
  ArrowLeft, ArrowUp, ArrowDown, Trash2, Plus, Copy, Check, Layout, AlertTriangle 
} from "lucide-react";
import { Card, Separator } from "@/components/ui";
import Link from "next/link";

type ViewportWidth = 360 | 768 | 1024 | 1440;

let fieldCounter = 0;

export default function FormBuilderPage() {
  const [activeFields, setActiveFields] = useState<FormField[]>([
    { id: "email-field", type: "email", label: "Email Address", placeholder: "developer@design-web.my.id", required: true, validationRule: "email" },
    { id: "password-field", type: "password", label: "Account Password", placeholder: "••••••••", required: true, validationRule: "password-strength" }
  ]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>("email-field");

  // Form testing inputs state
  const [testValues, setTestValues] = useState<Record<string, string>>({});
  const [viewportWidth, setViewportWidth] = useState<ViewportWidth>(768);
  const [activeTab, setActiveTab] = useState<"visual" | "code" | "zod">("visual");

  // Copy code feedback
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedField = useMemo(() => {
    return activeFields.find((f) => f.id === selectedFieldId) || null;
  }, [activeFields, selectedFieldId]);

  // Append new catalog field to workspace list
  const handleAddField = (catalogField: FormField) => {
    const newField: FormField = {
      ...JSON.parse(JSON.stringify(catalogField)),
      id: `${catalogField.type}-${fieldCounter++}`
    };
    setActiveFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
  };

  // Reorder fields up / down
  const handleMoveField = (index: number, dir: "up" | "down") => {
    const targetIdx = dir === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= activeFields.length) return;
    
    const updated = [...activeFields];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setActiveFields(updated);
  };

  // Delete field
  const handleDeleteField = (id: string) => {
    setActiveFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  };

  // Field Meta tweaks
  const handleUpdateFieldMeta = (key: "label" | "placeholder", value: string) => {
    if (!selectedFieldId) return;
    setActiveFields((prev) => 
      prev.map((f) => (f.id === selectedFieldId ? { ...f, [key]: value } : f))
    );
  };

  const handleUpdateFieldRequired = (value: boolean) => {
    if (!selectedFieldId) return;
    setActiveFields((prev) => 
      prev.map((f) => (f.id === selectedFieldId ? { ...f, required: value } : f))
    );
  };

  // Live input testing validation checking
  const checkValidationError = (field: FormField) => {
    const value = testValues[field.id] || "";
    if (field.required && !value) {
      return "Required field";
    }
    if (field.type === "email" && value && !value.includes("@")) {
      return "Invalid email syntax";
    }
    return null;
  };

  // Export copy
  const handleCopyCode = () => {
    let content = "";
    if (activeTab === "code") {
      content = compileToReactHookForm({ name: "CustomForm", fields: activeFields });
    } else if (activeTab === "zod") {
      content = compileToZodSchema(activeFields);
    }
    navigator.clipboard.writeText(content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full text-[var(--foreground)]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4 shrink-0">
        <div className="space-y-1 text-left">
          <Link href="/forms" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Forms Registry
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Layout className="h-5 w-5 text-[var(--primary)]" />
            Forms Studio Builder
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Assemble dynamic forms blocks, set required tags validation rules, and export Zod schemas.
          </p>
        </div>

        {/* Viewport resizer */}
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] text-xs font-semibold select-none">
          <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] px-2">Viewport Width</span>
          {([360, 768, 1024, 1440] as ViewportWidth[]).map((w) => (
            <button
              key={w}
              onClick={() => setViewportWidth(w)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                viewportWidth === w
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Outline lists & Catalog Append (3 cols) */}
        <div className="lg:col-span-3 space-y-6 md:sticky md:top-20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Fields Outlines</span>
          
          <div className="space-y-1 bg-[var(--surface)]/30 border border-[var(--border)] rounded-xl p-2.5 max-h-[220px] overflow-y-auto">
            {activeFields.map((f, idx) => (
              <div 
                key={f.id}
                onClick={() => setSelectedFieldId(f.id)}
                className={`px-2.5 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer border transition-all ${
                  selectedFieldId === f.id
                    ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-semibold"
                    : "border-transparent hover:bg-[var(--surface)] text-[var(--foreground)]"
                }`}
              >
                <span className="truncate">{f.label}</span>
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleMoveField(idx, "up")} disabled={idx === 0} className="hover:text-[var(--foreground)] disabled:opacity-30">
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <button onClick={() => handleMoveField(idx, "down")} disabled={idx === activeFields.length - 1} className="hover:text-[var(--foreground)] disabled:opacity-30">
                    <ArrowDown className="h-3 w-3" />
                  </button>
                  <button onClick={() => handleDeleteField(f.id)} className="text-[var(--destructive)] hover:text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
            {activeFields.length === 0 && (
              <div className="text-center py-6 text-[var(--muted-foreground)] text-xs">No fields added. Append inputs below.</div>
            )}
          </div>

          <Separator />

          {/* Add block catalog */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Input Catalog</span>
            <div className="grid grid-cols-2 gap-1.5">
              {FORM_CATALOG_FIELDS.map((field) => (
                <button
                  key={field.id}
                  onClick={() => handleAddField(field)}
                  className="px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[10px] font-bold text-center hover:bg-[var(--surface)] transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
                >
                  <Plus className="h-3 w-3 text-[var(--primary)]" /> {field.type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Live composition renderer & Viewport container (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <div className="flex gap-4 text-xs font-semibold select-none">
              {(["visual", "code", "zod"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer capitalize ${
                    activeTab === tab ? "border-[var(--primary)] text-[var(--primary)] font-bold" : "border-transparent text-[var(--muted-foreground)]"
                  }`}
                >
                  {tab === "visual" ? "Visual Form preview" : tab === "code" ? "React component" : "Zod schema"}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">Composer canvas</span>
          </div>

          {/* 1. Visual composition form preview with live error indicators */}
          {activeTab === "visual" && (
            <div className="w-full flex justify-center bg-[var(--background)]/30 rounded-xl border border-[var(--border)] border-dashed p-4 min-h-[400px]">
              <div 
                className="w-full space-y-4 bg-[var(--background)] p-6 rounded-xl border border-[var(--border)] shadow-sm text-left transition-all duration-300"
                style={{ maxWidth: `${viewportWidth}px` }}
              >
                {activeFields.map((f) => {
                  const error = checkValidationError(f);
                  const isSelected = selectedFieldId === f.id;

                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFieldId(f.id)}
                      className={`p-3 rounded-lg border transition-all text-xs space-y-1.5 ${
                        isSelected ? "border-[var(--primary)] bg-[var(--accent)]/5" : "border-transparent hover:bg-[var(--surface)]/40"
                      }`}
                    >
                      <label className="text-xs font-semibold text-[var(--foreground)] block">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      
                      {f.type === "checkbox" || f.type === "switch" ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!!testValues[f.id]}
                            onChange={(e) => setTestValues({ ...testValues, [f.id]: e.target.checked ? "checked" : "" })}
                            className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-4 w-4"
                          />
                          <span className="text-[11px] text-[var(--muted-foreground)]">Confirm terms toggle</span>
                        </div>
                      ) : (
                        <input
                          type={f.type}
                          placeholder={f.placeholder || ""}
                          value={testValues[f.id] || ""}
                          onChange={(e) => setTestValues({ ...testValues, [f.id]: e.target.value })}
                          className={`w-full text-xs px-3 py-2 rounded-lg border bg-[var(--surface)] text-[var(--foreground)] focus:outline-none ${
                            error ? "border-red-500 ring-1 ring-red-500" : "border-[var(--border)]"
                          }`}
                        />
                      )}

                      {/* Display live validation errors */}
                      {error && (
                        <div className="text-[10px] text-red-500 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 shrink-0" /> {error}
                        </div>
                      )}
                    </div>
                  );
                })}
                {activeFields.length === 0 && (
                  <div className="text-center py-24 text-xs text-[var(--muted-foreground)]">Empty Form. Append input catalog items.</div>
                )}
              </div>
            </div>
          )}

          {/* 2. Code exporter views */}
          {activeTab !== "visual" && (
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] font-mono">React Hook Form snippet</span>
                <button
                  onClick={handleCopyCode}
                  className="text-[var(--primary)] hover:underline flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedCode ? "Copied!" : "Copy Snippet"}
                </button>
              </div>
              <pre className="text-[10px] font-mono bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] overflow-x-auto max-h-[350px] overflow-y-auto leading-relaxed">
                {activeTab === "code" && compileToReactHookForm({ name: "CustomForm", fields: activeFields })}
                {activeTab === "zod" && compileToZodSchema(activeFields)}
              </pre>
            </div>
          )}
        </div>

        {/* Right: Field Inspector panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border-b border-[var(--border)] pb-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">Field settings inspector</span>
          </div>

          {selectedField ? (
            <Card className="p-4 bg-[var(--surface)] border-[var(--border)] space-y-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">Styling Parameters</span>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Input Label Title</label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) => handleUpdateFieldMeta("label", e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
                />
              </div>

              {selectedField.type !== "checkbox" && selectedField.type !== "switch" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Placeholder Hint</label>
                  <input
                    type="text"
                    value={selectedField.placeholder || ""}
                    onChange={(e) => handleUpdateFieldMeta("placeholder", e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
                  />
                </div>
              )}

              <Separator />

              {/* Required toggle */}
              <div className="flex items-center gap-2 pt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-xs select-none text-[var(--foreground)]">
                  <input
                    type="checkbox"
                    checked={selectedField.required}
                    onChange={(e) => handleUpdateFieldRequired(e.target.checked)}
                    className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-3.5 w-3.5"
                  />
                  <span>Require Field Entry Validation</span>
                </label>
              </div>
            </Card>
          ) : (
            <div className="text-center py-12 text-xs text-[var(--muted-foreground)]">Select a form field input in the composition preview to tweak details.</div>
          )}
        </div>
      </div>
    </main>
  );
}
