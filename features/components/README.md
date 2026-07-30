# 🏛️ Component Gallery & Design System Library (`features/components`)

This directory houses the **Design System Component Gallery** for the Design Laboratory. It is a structured showroom environment where every component can be developed, tested, documented, and reviewed against accessibility parameters before promotion to production codebase branches.

---

## 📂 Gallery Architecture

```
features/components/
├── types.ts               # ComponentShowcase, ComponentVariant schemas
├── registry-manifest.ts   # GENERATED static index importing all components
├── README.md              # Gallery guidelines
└── registry/              # Categorized raw specifications
    ├── core/
    │   └── button.tsx     # Button showcase mapping
    ├── forms/
    │   └── input.tsx      # Input field showcase mapping
    └── data-display/
        └── badge.tsx      # Badge label showcase mapping
```

---

## 🔄 Component Lifecycle

Every component in our system follows this lifecycle:

```
[Draft Experimental Idea] ──► [Develop UI Primitive under components/ui]
                                          │
                                          ▼
                         [Register Spec folder in registry/]
                   (defines variants, types, keyboard maps, ARIA)
                                          │
                                          ▼
                             [Build Registry compiler]
                       (regenerates manifest statically)
                                          │
                                          ▼
                         [Interactive Audit in /components]
                     (accessibility score, contrast AA check)
                                          │
                                          ▼
                         [Production Approved Badge]
                      (promoted to production portfolio)
```

---

## 🛠️ Automated Registry Compiler

To support scaling to **200+ components** without manual central file edits, we utilize a build-time compiler:
1. When running `npm run build` or `npm run dev`, the script [`scripts/build-component-registry.js`](file:///C:/Users/Acer/Music/Project%20note%20js/design-web/scripts/build-component-registry.js) runs.
2. It traverses `features/components/registry/` recursively looking for `.tsx` files.
3. It generates `features/components/registry-manifest.ts` automatically.
4. Adding a new component only requires dropping a `.tsx` file into the appropriate directory, with **zero changes to any existing files**.

---

## ♿ Quality & Accessibility Panel

Every registered showcase component is audited against five pillars:
1. **Accessibility Score**: Rating from 0 to 100 based on ARIA guidelines.
2. **Keyboard Navigation**: Defined trigger key maps.
3. **Contrast Compliance**: Dynamic checking against WCAG AA requirements inside our Theme Engine.
4. **Responsive Integrity**: Verified across Desktop, Laptop, Tablet, and Mobile viewports.
5. **Quality Badge**: Marked as `production` (approved), `experimental` (draft), or `deprecated`.
