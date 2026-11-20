"use client";

import React from "react";
import { Student } from "@/types/assessment";
import { calculateStudentStats } from "@/lib/calculations";
import { X, Printer, Download, FileText, CheckCircle2 } from "lucide-react";

interface DownloadMarksModalProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onPrintReport: (studentId: string) => void;
  onDownloadCsv: (studentId: string) => void;
}

export const DownloadMarksModal: React.FC<DownloadMarksModalProps> = ({
  isOpen,
  student,
  onClose,
  onPrintReport,
  onDownloadCsv,
}) => {
  if (!isOpen || !student) return null;

  const stats = calculateStudentStats(student);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Download className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Download Student Assessment Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Overview */}
        <div className="p-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">{student.name}</h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  ID: {student.studentId || "N/A"} · {student.track}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Marks Awarded</div>
                <div className="text-lg font-mono font-extrabold text-slate-900">
                  {stats.totalMarksObtained} / {stats.totalPossibleMarks}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Criteria Assessed: <strong>{stats.totalAssessed} / {stats.totalCriteriaCount}</strong>
              </span>
              {stats.isFullyAssessed ? (
                <span className="font-bold text-emerald-700">
                  {stats.finalPercentage?.toFixed(1)}% · {stats.evaluationLevel.label}
                </span>
              ) : (
                <span className="font-bold text-amber-700">
                  Status: NOT ASSESSED (Incomplete)
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-600 mb-4">
            Select your preferred export format for this student&apos;s complete 38-criteria assessment:
          </p>

          <div className="space-y-3">
            {/* PDF Report Option */}
            <button
              onClick={() => {
                onPrintReport(student.id);
                onClose();
              }}
              className="w-full flex items-start p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 hover:bg-amber-100/60 text-left transition-colors group"
            >
              <div className="p-2.5 rounded-lg bg-amber-400 text-slate-950 mr-3.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Printable PDF Official Report</span>
                  <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Formatted institutional transcript with header, full 38 criteria, category subtotals, band result, and signature lines. Opens browser print dialog to save as PDF.
                </p>
              </div>
            </button>

            {/* CSV Option */}
            <button
              onClick={() => {
                onDownloadCsv(student.id);
                onClose();
              }}
              className="w-full flex items-start p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-left transition-colors group"
            >
              <div className="p-2.5 rounded-lg bg-slate-900 text-white mr-3.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900">
                  Individual Student CSV Spreadsheet
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Raw data export containing metadata, category subtotals, every criterion name, maximum marks, awarded marks, assessment status, and evaluator comments.
                </p>
              </div>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

