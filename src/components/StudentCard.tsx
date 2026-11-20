"use client";

import React from "react";
import { Student } from "@/types/assessment";
import { calculateStudentStats } from "@/lib/calculations";
import { Download, Edit2, Trash2, ArrowRight, UserCheck, Calendar } from "lucide-react";

interface StudentCardProps {
  student: Student;
  onEvaluate: (studentId: string) => void;
  onDownload: (studentId: string) => void;
  onEdit: (studentId: string) => void;
  onDelete: (studentId: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEvaluate,
  onDownload,
  onEdit,
  onDelete,
}) => {
  const stats = calculateStudentStats(student);
  const initials = (student.name || "ST")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const progressPct = Math.round((stats.totalAssessed / stats.totalCriteriaCount) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all hover:shadow-md p-4 sm:p-5 flex flex-col justify-between">
      {/* Top Row: Avatar, Name, Metadata */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0 border border-slate-700">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 truncate tracking-tight">
                {student.name}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs text-slate-500">
                <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium text-[11px]">
                  {student.studentId || "ID-PENDING"}
                </span>
                <span>•</span>
                <span className="truncate">{student.batch || "Batch N/A"}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions (Edit / Delete) */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <button
              onClick={() => onEdit(student.id)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Edit candidate details"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Delete candidate record"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Track & Evaluator info */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
            {student.track || "General Track"}
          </div>
          <div className="flex items-center space-x-1 text-slate-500 truncate" title={`Assessor: ${student.evaluator || "Unassigned"}`}>
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate font-medium">{student.evaluator || "Unassigned"}</span>
          </div>
        </div>

        {/* Assessment Progress Bar */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">
              Criteria Completed: <strong className="text-slate-800">{stats.totalAssessed}</strong>/{stats.totalCriteriaCount}
            </span>
            <span className="font-semibold text-slate-700">{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                stats.isFullyAssessed ? "bg-emerald-500" : "bg-amber-500"
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Score & Evaluation Level Banner */}
        <div className="mt-3.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-slate-500">Marks Awarded</div>
            <div className="text-lg font-extrabold font-mono text-slate-900 leading-tight">
              {stats.totalMarksObtained}
              <span className="text-xs text-slate-500 font-medium ml-1">/ {stats.totalPossibleMarks}</span>
            </div>
          </div>

          <div className="text-right">
            {stats.isFullyAssessed && stats.finalPercentage !== null ? (
              <>
                <div className="text-xs font-bold text-emerald-700">
                  {stats.finalPercentage.toFixed(1)}% Score
                </div>
                <div className={`mt-0.5 inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border ${stats.evaluationLevel.badgeBg} ${stats.evaluationLevel.border}`}>
                  {stats.evaluationLevel.label}
                </div>
              </>
            ) : (
              <>
                <div className="text-xs font-medium text-amber-700">
                  {stats.totalCriteriaCount - stats.totalAssessed} Unassessed
                </div>
                <div className="mt-0.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300">
                  NOT ASSESSED
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons (Evaluate & Download Marks) */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
        <button
          onClick={() => onEvaluate(student.id)}
          className="w-full inline-flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
        >
          <span>Evaluate</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </button>

        <button
          onClick={() => onDownload(student.id)}
          className="w-full inline-flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors"
          title="Download complete individual marks report (PDF or CSV)"
        >
          <Download className="w-3.5 h-3.5 mr-1 text-amber-700" />
          <span>Download Marks</span>
        </button>
      </div>
    </div>
  );
};

