export interface Criterion {
  id: string;
  name: string;
  maxMarks: number;
  monitor: string;
  guidance: string;
  fallback: string;
}

export interface Category {
  id: string;
  categoryNumber: number;
  name: string;
  shortName: string;
  maxMarks: number;
  icon: string;
  criteria: Criterion[];
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email?: string;
  track: string;
  batch: string;
  evaluator: string;
  evaluatorTitle?: string;
  assessmentDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  marks: Record<string, number | undefined>;
  comments: Record<string, string | undefined>;
}

export interface CategoryStat {
  categoryId: string;
  categoryName: string;
  shortName: string;
  maxMarks: number;
  assessedCount: number;
  totalCriteria: number;
  marksObtained: number;
  isComplete: boolean;
  percentage: number | null;
}

export interface EvaluationLevel {
  label: string;
  class: string;
  badgeBg: string;
  badgeText: string;
  border: string;
}

export interface StudentStats {
  totalAssessed: number;
  totalCriteriaCount: number;
  totalMarksObtained: number;
  totalPossibleMarks: number;
  isFullyAssessed: boolean;
  finalPercentage: number | null;
  evaluationLevel: EvaluationLevel;
  categoryStats: CategoryStat[];
}

export interface ScoringBand {
  min: number;
  max: number;
  label: string;
  badgeBg: string;
  badgeText: string;
  border: string;
}

