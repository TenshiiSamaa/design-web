import { AuditReport } from "./types";

export const COMPONENT_AUDITS: AuditReport[] = [
  {
    id: "button",
    targetName: "Button Primitive",
    timestamp: new Date().toISOString(),
    scores: {
      contrast: 98,
      keyboard: 100,
      screenReader: 95,
      touchTarget: 90,
      typography: 100,
      animation: 95,
      responsive: 100,
      performance: 98,
      overall: 97
    },
    checks: [
      {
        id: "btn-contrast",
        name: "Foreground Contrast Ratio",
        category: "contrast",
        status: "pass",
        score: 98,
        description: "Button text foreground achieves a contrast ratio greater than 4.5:1 on background surfaces."
      },
      {
        id: "btn-keyboard",
        name: "Tab & Shift-Tab Focus Flow",
        category: "keyboard",
        status: "pass",
        score: 100,
        description: "Keyboard tabs land cleanly on interactive buttons and activate instantly with Enter or Space keys."
      },
      {
        id: "btn-touch",
        name: "Minimum Pointer Size Area",
        category: "touch-target",
        status: "warning",
        score: 80,
        description: "Small sizing multipliers have touch targets under the recommended 44x44px minimum layout criteria.",
        suggestion: "Increase vertical padding on mobile screen widths to meet 44px boundaries."
      },
      {
        id: "btn-aria",
        name: "Screen Reader Name Association",
        category: "screen-reader",
        status: "pass",
        score: 95,
        description: "All icon-only button configurations incorporate aria-label tags for screen readers."
      }
    ]
  },
  {
    id: "input",
    targetName: "Form Input Control",
    timestamp: new Date().toISOString(),
    scores: {
      contrast: 85,
      keyboard: 90,
      screenReader: 80,
      touchTarget: 95,
      typography: 90,
      animation: 100,
      responsive: 100,
      performance: 95,
      overall: 89
    },
    checks: [
      {
        id: "inp-contrast",
        name: "Borders & Focus Ring Visibility",
        category: "contrast",
        status: "warning",
        score: 75,
        description: "Default placeholder and unfocused border outlines fall below the 3:1 graphical element ratio.",
        suggestion: "Darken border and outline variable tokens to guarantee separation."
      },
      {
        id: "inp-keyboard",
        name: "Keyboard Focus Outlines",
        category: "keyboard",
        status: "pass",
        score: 100,
        description: "Focus outline ring activates instantly, leveraging high-contrast system rings."
      },
      {
        id: "inp-aria",
        name: "Associated Labels",
        category: "screen-reader",
        status: "fail",
        score: 60,
        description: "Form inputs lack explicit HTML label tags or aria-describedby placeholder mappings.",
        suggestion: "Wrap form fields inside label elements or link description tags explicitly."
      }
    ]
  }
];

/**
 * Compiles a report to Markdown text
 */
export function compileToMarkdown(report: AuditReport): string {
  const checkLines = report.checks
    .map((c) => `- **[${c.status.toUpperCase()}]** ${c.name} (${c.score}/100): ${c.description} ${c.suggestion ? `*Fix: ${c.suggestion}*` : ""}`)
    .join("\n");
  
  return `# Accessibility Audit Summary: ${report.targetName}
Date: ${report.timestamp}
Overall Quality Score: **${report.scores.overall}/100**

## Category breakdown
- Contrast compliance: ${report.scores.contrast}%
- Keyboard navigation: ${report.scores.keyboard}%
- Screen reader ARIA: ${report.scores.screenReader}%
- Touch target pointer: ${report.scores.touchTarget}%
- Responsive layout: ${report.scores.responsive}%
- Performance CLS: ${report.scores.performance}%

## Detailed checks logs
${checkLines}
`;
}

/**
 * Compiles a report to CSV text
 */
export function compileToCsv(report: AuditReport): string {
  const headers = "ID,Name,Category,Status,Score,Description,Suggestion";
  const rows = report.checks
    .map((c) => `"${c.id}","${c.name}","${c.category}","${c.status}",${c.score},"${c.description.replace(/"/g, '""')}","${(c.suggestion || "").replace(/"/g, '""')}"`)
    .join("\n");
  
  return `${headers}\n${rows}`;
}
