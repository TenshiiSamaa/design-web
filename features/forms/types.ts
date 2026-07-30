export interface FormField {
  id: string;
  type: "text" | "password" | "email" | "checkbox" | "switch" | "select";
  label: string;
  placeholder?: string;
  required: boolean;
  validationRule?: "email" | "password-strength" | "none";
}

export interface FormSpec {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  fields: FormField[];
  responsive: boolean;
  accessibilityScore: number;
  dependencies: string[];
  recommendedUsage: string[];
}
