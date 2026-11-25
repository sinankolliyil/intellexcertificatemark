import { Student, StudentStats, EvaluationLevel } from "@/types/assessment";
import { CRITERIA_CATEGORIES, TOTAL_POSSIBLE_MARKS, TOTAL_CRITERIA_COUNT, SCORING_LEVELS } from "@/data/criteriaData";

export function getEvaluationBand(pct: number | null | undefined): EvaluationLevel {
  if (pct === null || pct === undefined || isNaN(pct)) {
    return {
      label: "NOT ASSESSED",
      class: "band-unassessed",
      badgeBg: "bg-amber-50 text-amber-900 border-amber-300",
      badgeText: "text-amber-800",
      border: "border-amber-300"
    };
  }

  const p = Math.round(pct);
  const band = SCORING_LEVELS.find(b => p >= b.min && p <= b.max) || SCORING_LEVELS[SCORING_LEVELS.length - 1];
  
  return {
    label: band.label,
    class: `band-${band.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    badgeBg: band.badgeBg,
    badgeText: band.badgeText,
    border: band.border
  };
}

export function calculateStudentStats(student: Student): StudentStats {
  let totalAssessed = 0;
  let totalMarksObtained = 0;

  const categoryStats = CRITERIA_CATEGORIES.map(cat => {
    let catAssessed = 0;
    let catMarks = 0;

    cat.criteria.forEach(crit => {
      const mark = student.marks ? student.marks[crit.id] : undefined;
      if (mark !== undefined && mark !== null && (typeof mark === "number" || (typeof mark === "string" && mark !== ""))) {
        const num = Number(mark);
        if (!isNaN(num)) {
          catAssessed++;
          catMarks += num;
        }
      }
    });

    totalAssessed += catAssessed;
    totalMarksObtained += catMarks;
    const isComplete = catAssessed === cat.criteria.length;
    const catPercentage = isComplete ? (catMarks / cat.maxMarks) * 100 : null;
    const qrScore = isComplete ? Number((catMarks / 10).toFixed(1)) : null;

    return {
      categoryId: cat.id,
      categoryName: cat.name,
      shortName: cat.shortName,
      maxMarks: cat.maxMarks,
      assessedCount: catAssessed,
      totalCriteria: cat.criteria.length,
      marksObtained: catMarks,
      isComplete,
      percentage: catPercentage,
      qrScore
    };
  });

  const isFullyAssessed = totalAssessed === TOTAL_CRITERIA_COUNT;
  let finalPercentage: number | null = null;
  let overallQrScore: number | null = null;
  let evaluationLevel: EvaluationLevel = {
    label: "NOT ASSESSED",
    class: "band-unassessed",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-300",
    badgeText: "text-amber-800",
    border: "border-amber-300"
  };

  if (isFullyAssessed) {
    finalPercentage = (totalMarksObtained / TOTAL_POSSIBLE_MARKS) * 100;
    overallQrScore = Number(((totalMarksObtained / TOTAL_POSSIBLE_MARKS) * 10).toFixed(1));
    evaluationLevel = getEvaluationBand(finalPercentage);
  }

  return {
    totalAssessed,
    totalCriteriaCount: TOTAL_CRITERIA_COUNT,
    totalMarksObtained,
    totalPossibleMarks: TOTAL_POSSIBLE_MARKS,
    isFullyAssessed,
    finalPercentage,
    qrScore: overallQrScore,
    evaluationLevel,
    categoryStats
  };
}

