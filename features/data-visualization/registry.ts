import { ChartSpec, DatasetSpec } from "./types";

export const MARKETPLACE_DATASETS: Record<string, DatasetSpec> = {
  revenue: {
    name: "Monthly Revenue (USD)",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [4000, 4500, 5100, 4900, 6200, 7500]
  },
  traffic: {
    name: "Web Traffic Visitors",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [1200, 1500, 1700, 1400, 1900, 900, 800]
  }
};

export const MARKETPLACE_CHARTS: ChartSpec[] = [
  {
    id: "chart-area",
    slug: "monthly-revenue-area-chart",
    name: "Dynamic Area Chart",
    category: "area",
    description: "Visualizes trends over time with filled areas representing cumulative sums.",
    version: "1.0.0",
    author: "Core Graphics Architect",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    tags: ["Analytics", "Finance", "Area"],
    datasetName: "revenue",
    responsive: true,
    animationSupport: true,
    accessibilityScore: 98,
    performanceScore: 97,
    recommendedUsage: ["Revenue tracking panels", "Monthly growth overviews"],
    relatedCharts: ["chart-line", "chart-bar"]
  },
  {
    id: "chart-bar",
    slug: "weekly-traffic-bar-chart",
    name: "Column Bar Chart",
    category: "bar",
    description: "Compares values across discrete data intervals using vertical rectangles.",
    version: "1.0.0",
    author: "Core Graphics Architect",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    tags: ["Analytics", "Traffic", "Bar"],
    datasetName: "traffic",
    responsive: true,
    animationSupport: true,
    accessibilityScore: 95,
    performanceScore: 96,
    recommendedUsage: ["Server logs monitoring", "Visitor comparison grids"],
    relatedCharts: ["chart-area"]
  }
];

/**
 * Formats a Chart configuration to clean TSX component source
 */
export function compileChartToJsx(chart: ChartSpec, dataset: DatasetSpec): string {
  return `import React from "react";\n\n// Dataset: ${dataset.name}\nconst data = ${JSON.stringify(dataset.values)};\nconst labels = ${JSON.stringify(dataset.labels)};\n\nexport default function ${chart.name.replace(/\s+/g, "")}() {\n  return (\n    <div className="w-full bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]">\n      <h3 className="text-sm font-bold mb-4 text-[var(--foreground)]">${chart.name}</h3>\n      <div className="flex items-end gap-2 h-48 pt-6">\n        {data.map((val, idx) => {\n          const pct = (val / Math.max(...data)) * 100;\n          return (\n            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">\n              <div className="w-full bg-[var(--primary)] rounded-t-lg transition-all" style={{ height: \`\${pct}%\` }} />\n              <span className="text-[10px] text-[var(--muted-foreground)] font-mono">{labels[idx]}</span>\n            </div>\n          );\n        })}\n      </div>\n    </div>\n  );\n}`;
}
