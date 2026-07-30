import { FormSpec, FormField } from "./types";

export const FORM_CATALOG_FIELDS: FormField[] = [
  {
    id: "cat-text",
    type: "text",
    label: "Username / Full Name",
    placeholder: "Enter your full name...",
    required: true
  },
  {
    id: "cat-email",
    type: "email",
    label: "Email Address",
    placeholder: "developer@design-web.my.id",
    required: true,
    validationRule: "email"
  },
  {
    id: "cat-password",
    type: "password",
    label: "Account Password",
    placeholder: "••••••••",
    required: true,
    validationRule: "password-strength"
  },
  {
    id: "cat-checkbox",
    type: "checkbox",
    label: "Accept Terms and Service agreements",
    required: true
  },
  {
    id: "cat-switch",
    type: "switch",
    label: "Enable Email Alerts notifications",
    required: false
  }
];

export const MARKETPLACE_FORMS: FormSpec[] = [
  {
    id: "form-auth",
    slug: "user-authentication-login",
    name: "User Authentication Login",
    category: "Authentication",
    description: "Compact standard authentication form displaying text/email validations, and password visibility toggles.",
    version: "1.0.0",
    author: "Core Forms Architect",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    responsive: true,
    accessibilityScore: 98,
    dependencies: ["react-hook-form", "zod"],
    recommendedUsage: ["Login gateways", "Auth portals"],
    fields: [
      { id: "email-1", type: "email", label: "Email Address", placeholder: "developer@design-web.my.id", required: true, validationRule: "email" },
      { id: "pass-1", type: "password", label: "Password", placeholder: "••••••••", required: true, validationRule: "password-strength" }
    ]
  }
];

/**
 * Compiles Form spec to copyable Zod validation schema
 */
export function compileToZodSchema(fields: FormField[]): string {
  const rules = fields
    .map((f) => {
      let rule = "z.string()";
      if (f.type === "email") rule = "z.string().email('Invalid email address')";
      if (f.type === "checkbox" || f.type === "switch") rule = "z.boolean()";
      
      if (f.required) {
        if (f.type === "checkbox") {
          rule += ".refine(val => val === true, 'You must accept terms')";
        } else {
          rule += ".min(1, 'Required field')";
        }
      } else {
        rule += ".optional()";
      }
      return `  ${f.id.replace(/-/g, "_")}: ${rule},`;
    })
    .join("\n");

  return `import { z } from "zod";\n\nexport const formSchema = z.object({\n${rules}\n});`;
}

/**
 * Compiles Form spec to copyable React Hook Form component code
 */
export function compileToReactHookForm(form: FormSpec | { name: string; fields: FormField[] }): string {
  const inputs = form.fields
    .map((f) => {
      const fieldId = f.id.replace(/-/g, "_");
      if (f.type === "checkbox" || f.type === "switch") {
        return `        {/* ${f.label} */}
        <label className="flex items-center gap-2 text-xs text-[var(--foreground)]">
          <input type="checkbox" {...register("${fieldId}")} className="rounded border-[var(--border)]" />
          <span>${f.label}</span>
        </label>
        {errors.${fieldId} && <span className="text-[10px] text-red-500">{errors.${fieldId}.message}</span>}`;
      }
      
      return `        {/* ${f.label} */}
        <div className="space-y-1 text-left">
          <label className="text-xs font-semibold text-[var(--foreground)] block">${f.label}</label>
          <input
            type="${f.type}"
            placeholder="${f.placeholder || ""}"
            {...register("${fieldId}")}
            className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
          />
          {errors.${fieldId} && <span className="text-[10px] text-red-500">{errors.${fieldId}.message}</span>}
        </div>`;
    })
    .join("\n\n");

  return `import React from "react";\nimport { useForm } from "react-hook-form";\nimport { zodResolver } from "@hookform/resolvers/zod";\nimport { formSchema } from "./schema";\n\nexport default function ${form.name.replace(/\s+/g, "")}() {\n  const { register, handleSubmit, formState: { errors } } = useForm({\n    resolver: zodResolver(formSchema)\n  });\n\n  const onSubmit = (data: any) => console.log(data);\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm w-full bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">\n${inputs}\n      <button type="submit" className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold py-2 rounded-lg">\n        Submit Form\n      </button>\n    </form>\n  );\n}`;
}
