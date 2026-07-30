import { Z_INDEX } from "./primitives";

/**
 * Z-INDEX ELEVATION TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const zIndex = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: Z_INDEX,

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    hide: Z_INDEX.hide,
    base: Z_INDEX.base,
    docked: Z_INDEX.docked,
    dropdown: Z_INDEX.dropdown,
    sticky: Z_INDEX.sticky,
    overlay: Z_INDEX.overlay,
    modal: Z_INDEX.modal,
    popover: Z_INDEX.popover,
    toast: Z_INDEX.toast,
    tooltip: Z_INDEX.tooltip
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    sidebar: Z_INDEX.base,
    dialog: Z_INDEX.modal,
    dialogOverlay: Z_INDEX.overlay,
    dropdownMenu: Z_INDEX.dropdown,
    tooltipPanel: Z_INDEX.tooltip
  }
};
export type ZIndexTokens = typeof zIndex;
