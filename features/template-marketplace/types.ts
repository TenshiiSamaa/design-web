export interface BlockSpec {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  previewImage?: string;
  responsive: boolean;
  darkMode: boolean;
  lightMode: boolean;
  motionSupport: boolean;
  accessibilityScore: number;
  dependencies: string[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  recommendedUsage: string[];
  relatedBlocks: string[];
  codeSnippet: string;
}

export interface TemplateSpec {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  blocks: string[]; // references block slugs or ids
  tags: string[];
}
