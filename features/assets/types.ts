export interface AssetSpec {
  id: string;
  slug: string;
  name: string;
  category: "icon" | "illustration" | "gradient" | "pattern";
  description: string;
  author: string;
  license: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  fileType: string;
  downloadable: boolean;
  themeCompatible: boolean;
  recommendedUsage: string[];
  codeContent: string; // SVG code or CSS configs
}
