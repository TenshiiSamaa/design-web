# 🛍️ Template Marketplace & Block Registry (`features/template-marketplace`)

This directory houses the **Template Marketplace & Block Registry** workspace for the Design Laboratory. It is a visual showroom where pre-composed pages and layout block primitives can be browsed, tested, and exported as accessible code blueprints.

---

## 📂 Marketplace Architecture

```
features/template-marketplace/
├── README.md              # Marketplace guidelines
├── types.ts               # BlockSpec, TemplateSpec interfaces schema
└── registry.ts            # Registries of blocks (Navbar, Hero, Pricing) and templates (SaaS page)
```

---

## 🏷️ Registry Categories & Block Schema

Every block primitive maps to standard schemas:
- **Identifier metadata**: `id`, `slug`, `name`, `category`.
- **Quality telemetry**: `accessibilityScore`, `responsive`, `darkMode`, `lightMode`.
- **Integrations**: `codeSnippet` (copyable TSX React source code), `dependencies` (required packages), `recommendedUsage`.

---

## 📄 Exporters & Exporter Flow

The details view supports multi-tab code compilation:
- **React / Next.js**: Outputs complete, self-contained TSX component blocks ready to drop into projects.
- **Tailwind Setup**: Lists custom extended colors configurations mapping to css theme tokens.
- **Registry Schema**: Outputs the raw JSON specification of the audited block.
