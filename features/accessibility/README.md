# 🧪 Accessibility & Quality Laboratory (`features/accessibility`)

This directory houses the **Accessibility & Quality Laboratory** workspace for the Design Laboratory. It acts as an automated audit scanner that inspects visual design primitive components (Buttons, Inputs, dialog drawers) against WCAG 2.2 Level AA requirements, compiling detailed developer summaries.

---

## 📂 Laboratory Architecture

```
features/accessibility/
├── README.md              # Quality lab guidelines
├── types.ts               # AuditCheck, QualityScores interfaces schema
└── registry.ts            # Component audit specs database and report exporters
```

---

## 🔬 Audit Parameters

The Laboratory audits elements against five core criteria:
1. **Contrast Compliance (WCAG AA)**: Audits visual text foreground and borders relative luminance.
2. **Keyboard Focus Flow**: Confirms focus indicators are interactive via Tab/Enter keys.
3. **Screen Reader Integration**: Verifies that components contain appropriate ARIA labels and roles.
4. **Touch Target Size**: Audits sizes relative to WCAG's mobile pointer spacing layout standard.
5. **Responsive Integrity**: Measures layouts across viewports to check for overflows or overlapping text.

---

## 📄 Developer Exporters

The Laboratory provides three export compiler options for developer reports:
- **JSON**: Outputs the raw audit schemas.
- **Markdown Summary**: Renders formatted bullet logs listing failures and fix suggestions.
- **CSV Spreadsheets**: Outputs comma-separated rows.

---

## 🚀 Future Roadmap Extensions

- **Axe-Core Core integration**: Eventually, we can bind `axe-core` client audits inside dev servers to automatically calculate live accessibility scores.
- **Figma variables bindings**: Sync Figma tokens with audited border contrast values.
