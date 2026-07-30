# 📐 Responsive Layout Builder & Page Composer (`features/layout-builder`)

This directory houses the **Responsive Layout Builder & Page Composer** workspace for the Design Laboratory. It is a visual composition workspace where developers can assemble section blocks, tweak padding and radius properties in real time, and copy production-ready TSX layout configurations.

---

## 📂 Layout Architecture

```
features/layout-builder/
├── README.md              # Layout guidelines
├── types.ts               # LayoutBlock, LayoutTemplate schemas
└── registry.ts            # Database of starter templates (Landing, Portfolio) and block catalog
```

---

## 🔬 Layout Composition Flow

1. **Load Starter Presets**: Select presets (e.g. SaaS Landing Page, Developer Portfolio) to load a stack of sections.
2. **Catalog Append**: Select block primitive sections (Hero, Features grid, pricing cards, FAQs accordion) from the bottom-left sidebar to append blocks to the active canvas.
3. **Reordering & Outlines**: Use outline buttons to shift blocks up/down, toggle visibilities, duplicate, or delete sections.
4. **Style Inspector**: Select any section to adjust styling parameters:
   - **Padding**: Vertical paddings (`none`, `sm`, `md`, `lg`).
   - **Border Radius**: Corner curves (`none`, `sm`, `md`, `lg`, `full`).
   - **Border Outline**: Toggle outlines mapping dynamic variables.
   - **Shadows**: Adjust shadows (`none`, `sm`, `md`, `lg`).

---

## 📄 Exporters

The workspace compiles composition states into standard **JSX/TSX component pages**:
- It reads the properties of visible sections (Title, Subtitle, paddings, shadows, borders).
- It outputs a copyable, production-ready React component.
