export interface AuditCheck {
  id: string;
  name: string;
  category: "contrast" | "keyboard" | "screen-reader" | "touch-target" | "typography" | "animation" | "responsive" | "performance";
  status: "pass" | "warning" | "fail";
  score: number;
  description: string;
  suggestion?: string;
}

export interface QualityScores {
  contrast: number;
  keyboard: number;
  screenReader: number;
  touchTarget: number;
  typography: number;
  animation: number;
  responsive: number;
  performance: number;
  overall: number;
}

export interface AuditReport {
  id: string;
  targetName: string;
  scores: QualityScores;
  checks: AuditCheck[];
  timestamp: string;
}
