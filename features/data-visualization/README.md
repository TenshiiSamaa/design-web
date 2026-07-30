# 📊 Data Visualization Laboratory (`features/data-visualization`)

This directory houses the **Data Visualization Laboratory** workspace for the Design Laboratory. It is a visual analytics staging area where Area/Line/Bar graphics can be edited, benchmarked, and exported.

---

## 📂 Laboratory Architecture

```
features/data-visualization/
├── README.md              # Visualization guidelines
├── types.ts               # ChartSpec, DatasetSpec interfaces schema
└── registry.ts            # Database of chart definitions and monthly revenue datasets
```

---

## 🧪 Visual Customizer & Themes

Every chart component adapts to design tokens:
1. **Light/Dark & Theme Repaints**: Visual columns and outlines reference HSL palette variables, preventing hardcoded color hashes.
2. **Dynamic Spacing Parameters**: The customizer tracks state parameters:
   - **Corner Radius**: Adjusts the top borders rounding.
   - **Border Outline Width**: Customizes divider border thicknesses.
   - **Background Grids**: Toggles background grid helper lines.

---

## 📄 Exporters Flow

The details page parses datasets and settings to output:
- **React Component**: Complete React TSX components showing static dataset arrays, grid lines parameters, and padding values.
- **Registry JSON**: Outputs the raw serialization schema.
