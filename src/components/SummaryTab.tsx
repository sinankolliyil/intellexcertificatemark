"use client";

import React from "react";
import { Student, StudentStats } from "@/types/assessment";
import { CRITERIA_CATEGORIES, TOTAL_POSSIBLE_MARKS, TOTAL_CRITERIA_COUNT } from "@/data/criteriaData";
import { AlertCircle, CheckCircle2, Download, Printer, ArrowRight, Award } from "lucide-react";

interface SummaryTabProps {
  student: Student;
  stats: StudentStats;
  onNavigateToCategory: (categoryIndex: number, criterionId?: string) => void;
  onDownloadReport: () => void;
  onDownloadCsv: () => void;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({
  student,
  stats,
  onNavigateToCategory,
  onDownloadReport,
  onDownloadCsv,
}) => {
  // Collect unassessed criteria by category
  const unassessedList: { categoryIndex: number; categoryName: string; criterionId: string; criterionName: string; maxMarks: number }[] = [];

  CRITERIA_CATEGORIES.forEach((cat, catIdx) => {
    cat.criteria.forEach((crit) => {
      const mark = student.marks ? student.marks[crit.id] : undefined;
      const isAssessed = mark !== undefined && mark !== null && !isNaN(Number(mark));
      if (!isAssessed) {
        unassessedList.push({
          categoryIndex: catIdx,
          categoryName: cat.shortName,
          criterionId: crit.id,
          criterionName: crit.name,
          maxMarks: crit.maxMarks,
        });
      }
    });
  });

  return (
    <div className="space-y-6">
      {/* Hero Overview Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Award className="w-4 h-4" />
              <span>Assessment Rollup Summary</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {student.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {student.track} · {student.batch} · Evaluator: {student.evaluator || "Unassigned"}
            </p>
          </div>

          {/* Overall Score Metrics */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
            {/* Total Marks */}
            <div>
              <div className="text-xs text-slate-400 font-medium">Marks Obtained</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {stats.totalMarksObtained}
                <span className="text-sm font-normal text-slate-400 ml-1.5">/ {TOTAL_POSSIBLE_MARKS}</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700 hidden sm:block" />

            {/* Percentage (Rule: Only calculate when all 38 criteria are assessed) */}
            <div>
              <div className="text-xs text-slate-400 font-medium">Percentage</div>
              {stats.isFullyAssessed && stats.finalPercentage !== null ? (
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                  {stats.finalPercentage.toFixed(1)}%
                </div>
              ) : (
                <div className="text-sm font-bold text-amber-400 py-1">
                  NOT ASSESSED
                </div>
              )}
            </div>

            <div className="h-10 w-px bg-slate-700 hidden sm:block" />

            {/* Quality Rating (QR) Metric */}
            <div>
              <div className="text-xs text-slate-400 font-medium">Public QR Score</div>
              {stats.isFullyAssessed && stats.qrScore !== null ? (
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                  {stats.qrScore.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                </div>
              ) : (
                <div className="text-sm font-bold text-amber-400 py-1">
                  PENDING
                </div>
              )}
            </div>

            <div className="h-10 w-px bg-slate-700 hidden sm:block" />

            {/* Evaluation Band */}
            <div>
              <div className="text-xs text-slate-400 font-medium">Evaluation Level</div>
              {stats.isFullyAssessed ? (
                <div className="mt-1">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${stats.evaluationLevel.badgeBg} ${stats.evaluationLevel.border}`}>
                    {stats.evaluationLevel.label}
                  </span>
                </div>
              ) : (
                <div className="mt-1">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    PENDING ({stats.totalAssessed}/{TOTAL_CRITERIA_COUNT})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar & Download Actions */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Overall Progress ({stats.totalAssessed} of {TOTAL_CRITERIA_COUNT} criteria)</span>
              <span className="font-bold text-white">
                {Math.round((stats.totalAssessed / TOTAL_CRITERIA_COUNT) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  stats.isFullyAssessed ? "bg-emerald-400" : "bg-amber-400"
                }`}
                style={{ width: `${(stats.totalAssessed / TOTAL_CRITERIA_COUNT) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onDownloadReport}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-sm"
              title="Generate printable official PDF assessment report"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onDownloadCsv}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              title="Download full criterion-by-criterion assessment as CSV"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unassessed Criteria Warning Banner (Crucial Rule Requirement) */}
      {!stats.isFullyAssessed && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 shadow-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-900">
                Evaluation Incomplete: {unassessedList.length} Criteria Marked as NOT ASSESSED
              </h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                As required by the standardized rubric, unassessed criteria are never treated as zero.
                A final overall percentage and evaluation level will only be computed once all 38 criteria have been assessed.
              </p>

              {/* Quick Jump Chips */}
              <div className="mt-3">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-2">
                  Click any criterion below to jump directly and score it:
                </span>
                <div className="flex flex-wrap gap-2">
                  {unassessedList.map((item) => (
                    <button
                      key={item.criterionId}
                      onClick={() => onNavigateToCategory(item.categoryIndex, item.criterionId)}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs transition-colors"
                    >
                      <span className="font-semibold mr-1">[{item.categoryName}]</span>
                      <span>{item.criterionName} ({item.maxMarks}m)</span>
                      <ArrowRight className="w-3 h-3 ml-1 text-amber-700" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Breakdown Cards */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3 tracking-tight">
          Category Performance Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CRITERIA_CATEGORIES.map((cat, idx) => {
            const catStat = stats.categoryStats.find((cs) => cs.categoryId === cat.id);
            const isCatComplete = catStat?.isComplete ?? false;
            const progress = catStat ? Math.round((catStat.assessedCount / catStat.totalCriteria) * 100) : 0;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Category {cat.categoryNumber}
                    </span>
                    {isCatComplete ? (
                      <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Complete
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-amber-600">
                        {catStat ? catStat.totalCriteria - catStat.assessedCount : 0} Remaining
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-2">
                    {cat.shortName}
                  </h4>

                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 font-medium">Subtotal Marks:</span>
                    <span className="text-lg font-mono font-extrabold text-slate-900">
                      {catStat?.marksObtained ?? 0}
                      <span className="text-xs font-normal text-slate-400 ml-1">/ {cat.maxMarks}</span>
                    </span>
                  </div>

                  <div className="mt-1 flex items-baseline justify-between text-xs">
                    <span className="text-slate-500 font-medium">Category QR Rating:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {catStat?.qrScore !== null && catStat?.qrScore !== undefined ? `${catStat.qrScore.toFixed(1)} / 10` : "—"}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCatComplete ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {catStat?.assessedCount}/{catStat?.totalCriteria} Criteria
                  </span>
                  <button
                    onClick={() => onNavigateToCategory(idx)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    <span>View Category</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

