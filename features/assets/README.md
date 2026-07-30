# 🎨 Asset Studio & Media Library (`features/assets`)

This directory houses the **Asset Studio & Media Library** workspace for the Design Laboratory. It is a visual assets staging area where SVG icons, illustrations, patterns, and background gradients can be browsed, customized, and exported.

---

## 📂 Studio Architecture

```
features/assets/
├── README.md              # Assets guidelines
├── types.ts               # AssetSpec schema interface
└── registry.ts            # Database of icons, empty state vectors, gradients, and patterns
```

---

## 🏷️ Asset Registry Schema

Every asset contains standard parameters:
- **Scope metadata**: `id`, `slug`, `name`, `category`.
- **Quality telemetry**: `themeCompatible`, `downloadable`.
- **Exporters code**: `codeContent` holds raw SVG codes or CSS parameters.

---

## 📄 Exporters Flow

The details view supports multi-tab code compilation:
- **Raw Code Content**: Returns pure vector XML tags or CSS style rules.
- **Base64 URI String**: Encodes the SVG into a data URI string (`data:image/svg+xml;base64,...`) ready to drop into HTML image components.
- **Registry JSON**: Outputs the raw serialization matching schemas.
