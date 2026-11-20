"use client";

import React, { useState } from "react";
import { Student } from "@/types/assessment";
import { CRITERIA_CATEGORIES, TOTAL_POSSIBLE_MARKS, TOTAL_CRITERIA_COUNT } from "@/data/criteriaData";
import { calculateStudentStats } from "@/lib/calculations";
import { CriterionCard } from "./CriterionCard";
import { SummaryTab } from "./SummaryTab";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Cpu,
  Users,
  MessageSquare,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

interface AssessmentViewProps {
  student: Student;
  onBackToDashboard: () => void;
  onUpdateMarks: (studentId: string, criterionId: string, mark: number | undefined) => void;
  onUpdateComments: (studentId: string, criterionId: string, comment: string) => void;
  onDownloadReport: (studentId: string) => void;
  onDownloadCsv: (studentId: string) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  student,
  onBackToDashboard,
  onUpdateMarks,
  onUpdateComments,
  onDownloadReport,
  onDownloadCsv,
}) => {
  // 0-4 are categories 1-5; 5 is the Summary Tab
  const [activeTab, setActiveTab] = useState<number>(0);

  const stats = calculateStudentStats(student);
  const currentCategory = activeTab < 5 ? CRITERIA_CATEGORIES[activeTab] : null;

  const navigateToCategory = (catIdx: number, criterionId?: string) => {
    setActiveTab(catIdx);
    if (criterionId) {
      setTimeout(() => {
        const el = document.getElementById(`criterion-${criterionId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-4 h-4" />;
      case "Cpu":
        return <Cpu className="w-4 h-4" />;
      case "Users":
        return <Users className="w-4 h-4" />;
      case "MessageSquare":
        return <MessageSquare className="w-4 h-4" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="pb-16">
      {/* Sticky Top Assessment Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Student metadata & back button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onBackToDashboard}
                className="inline-flex items-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Return to Student Dashboard"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {student.name}
                  </h2>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {student.studentId || "NO-ID"}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  <span>{student.track}</span> · <span>Evaluator: {student.evaluator || "Unassigned"}</span>
                </div>
              </div>
            </div>

            {/* Live Score Counter & Actions */}
            <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
              <div className="text-right">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Live Score
                </div>
                <div className="text-lg sm:text-xl font-mono font-extrabold text-slate-900">
                  {stats.totalMarksObtained}
                  <span className="text-xs font-normal text-slate-400 ml-1">/ {TOTAL_POSSIBLE_MARKS}</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 hidden sm:block" />

              <div className="text-right">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Completion
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {stats.totalAssessed} / {TOTAL_CRITERIA_COUNT}
                </div>
              </div>

              {/* Download Marks Button */}
              <button
                onClick={() => onDownloadReport(student.id)}
                className="inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-sm ml-2"
                title="Download complete individual mark report (PDF / Print)"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                <span>Download Marks</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs Navigation Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <div className="flex space-x-1 sm:space-x-2 py-2 min-w-max">
            {CRITERIA_CATEGORIES.map((cat, idx) => {
              const catStat = stats.categoryStats.find((cs) => cs.categoryId === cat.id);
              const isSelected = activeTab === idx;
              const isComplete = catStat?.isComplete ?? false;

              return (
                <button
                  key={cat.id}
                  onClick={() => navigateToCategory(idx)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs font-semibold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span>{getCategoryIcon(cat.icon)}</span>
                  <span>{cat.shortName}</span>
                  <span
                    className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-slate-800 text-amber-300 font-bold"
                        : isComplete
                        ? "bg-emerald-100 text-emerald-800 font-semibold"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {catStat?.marksObtained ?? 0}/{cat.maxMarks}
                  </span>
                </button>
              );
            })}

            {/* Summary Tab */}
            <button
              onClick={() => navigateToCategory(5)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 5
                  ? "bg-slate-900 text-white shadow-xs font-semibold"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200"
              }`}
            >
              <BarChart3 className="w-4 h-4 text-amber-500" />
              <span>Full Summary</span>
              {stats.isFullyAssessed ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab < 5 && currentCategory ? (
          <div>
            {/* Category Banner */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold font-mono uppercase text-slate-500 tracking-wider">
                  Category {currentCategory.categoryNumber} of 5
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {currentCategory.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentCategory.criteria.length} Criteria · Maximum Subtotal: <strong>{currentCategory.maxMarks} Marks</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500">Category Subtotal:</span>
                <div className="text-xl font-mono font-extrabold text-slate-900">
                  {stats.categoryStats[activeTab]?.marksObtained ?? 0}
                  <span className="text-xs font-normal text-slate-400 ml-1">/ {currentCategory.maxMarks}</span>
                </div>
              </div>
            </div>

            {/* Criteria Cards List */}
            <div className="space-y-4">
              {currentCategory.criteria.map((crit, idx) => (
                <CriterionCard
                  key={crit.id}
                  criterion={crit}
                  currentMark={student.marks ? student.marks[crit.id] : undefined}
                  currentComment={student.comments ? student.comments[crit.id] : undefined}
                  onMarkChange={(criterionId, mark) => onUpdateMarks(student.id, criterionId, mark)}
                  onCommentChange={(criterionId, comment) => onUpdateComments(student.id, criterionId, comment)}
                  index={idx}
                />
              ))}
            </div>

            {/* Next / Previous Category Navigation Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              {activeTab > 0 ? (
                <button
                  type="button"
                  onClick={() => navigateToCategory(activeTab - 1)}
                  className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  <span>Previous Category</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => navigateToCategory(activeTab + 1)}
                className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                <span>{activeTab === 4 ? "View Full Summary" : "Next Category"}</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          /* Summary Tab View */
          <SummaryTab
            student={student}
            stats={stats}
            onNavigateToCategory={navigateToCategory}
            onDownloadReport={() => onDownloadReport(student.id)}
            onDownloadCsv={() => onDownloadCsv(student.id)}
          />
        )}
      </div>
    </div>
  );
};

