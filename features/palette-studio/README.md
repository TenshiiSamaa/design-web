# 🎨 Palette Studio & Color Intelligence (`features/palette-studio`)

This directory houses the **Palette Studio & Color Intelligence** workspace for the Design Laboratory. It is a visual command center where color palettes can be dynamically created, cloned, customized, audited against WCAG AA standards, and compiled into production-ready configs.

---

## 📂 Studio Architecture

```
features/palette-studio/
├── README.md              # Studio guidelines
└── utils/
    └── color-suggest.ts   # Automated WCAG AA color correction calculations
```

---

## ⚙️ Automated Color Intelligence (Auto-Fixer)

1. **Calculates contrast failures**: The Studio triggers Relative Luminance formulas inside the validation report engine to check color pairings.
2. **Dynamic lightness adjustment**: If a critical pairing falls below the target (e.g. text on background is under `4.5:1` ratio), `color-suggest` takes the textColor and bgColor.
3. **Blending formula**:
   - For light backgrounds, the textColor is iteratively blended with black in 10% steps.
   - For dark backgrounds, the textColor is iteratively blended with white in 10% steps.
   - It outputs the first hex color that meets the WCAG AA contrast ratio threshold.
4. **Instant Application**: Clicking **Auto-Fix** applies the suggested hex to the active editor state instantly, updating the component showroom in real time.

---

## 📄 Code Compilers & Variable Exporters

The Studio translates live color changes into three formats:
1. **CSS Variables Stylesheet**: Compiles the editor values as clean `--background`, `--primary` variables inside a `:root {}` block.
2. **Tailwind Extended Theme**: Formats theme extensions mapping color utilities to the custom properties.
3. **JSON Palette Schema**: Serializes the complete palette configuration (including description, metadata, light/dark themes, and preview metadata) matching `Palette` contracts.

---

## 🚀 Future Scalability Notes

- **Dynamic Contrast Boosting**: If a custom user theme fails validation, we can programmatically shift luminance values until it satisfies WCAG standards.
- **Export System**: Export active CSS variables as standard theme definitions for Figma variables or Style Dictionary JSON config formats.
