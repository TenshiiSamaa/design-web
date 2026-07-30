export interface ChartSpec {
  id: string;
  slug: string;
  name: string;
  category: "area" | "line" | "bar" | "pie" | "donut" | "scatter" | "gauge";
  description: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  datasetName: string;
  responsive: boolean;
  animationSupport: boolean;
  accessibilityScore: number;
  performanceScore: number;
  recommendedUsage: string[];
  relatedCharts: string[];
}

export interface DatasetSpec {
  name: string;
  labels: string[];
  values: number[];
}
