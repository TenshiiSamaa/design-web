# 📋 Forms Studio & Page Composer (`features/forms`)

This directory houses the **Forms Studio & Page Composer** workspace for the Design Laboratory. It is a visual composition showroom where developers can assemble input fields, set required validation rules, run live email checks, and export TSX and Zod code snippets.

---

## 📂 Studio Architecture

```
features/forms/
├── README.md              # Forms guidelines
├── types.ts               # FormField, FormSpec interfaces schema
└── registry.ts            # Database of form definitions and Zod/RHF code compilers
```

---

## ⚙️ Form Builder & Live Validation

The Forms Studio integrates active validation states:
1. **Empty Required Checking**: If a field with `required: true` has empty values, it raises a "Required field" error.
2. **Email Formatting Check**: Email fields inspect values to confirm the presence of `@` symbols.
3. **Responsive Previews**: Grid elements flow cleanly down to mobile widths without breaking outlines.

---

## 📄 Exporter System Flow

The builder translates composer configurations into three formats:
- **Zod Validation Schema**: Outputs clean, copyable validation objects (`z.object({ ... })`) ready for imports.
- **React Component (RHF)**: Compiles complete, ready-to-run React Hook Form modules using the Zod resolver.
- **Registry Schema**: Outputs serialized JSON.
