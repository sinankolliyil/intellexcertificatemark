"use client";

import React from "react";
import { Users, CheckCircle2, Clock, Award } from "lucide-react";

interface StatsCardsProps {
  totalStudents: number;
  fullyAssessedCount: number;
  pendingCount: number;
  classAverage: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalStudents,
  fullyAssessedCount,
  pendingCount,
  classAverage,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Total Students */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Candidates
          </span>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalStudents}
          </span>
          <span className="ml-2 text-xs text-slate-500">enrolled</span>
        </div>
      </div>

      {/* Fully Assessed */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Completed (38/38)
          </span>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
            {fullyAssessedCount}
          </span>
          <span className="ml-2 text-xs text-slate-500">
            {totalStudents > 0 ? `${Math.round((fullyAssessedCount / totalStudents) * 100)}%` : "0%"}
          </span>
        </div>
      </div>

      {/* Pending Assessment */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            In Progress / Pending
          </span>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight">
            {pendingCount}
          </span>
          <span className="ml-2 text-xs text-slate-500">evaluations</span>
        </div>
      </div>

      {/* Class Average Score */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Cohort Average
          </span>
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 tracking-tight">
            {classAverage}
          </span>
          <span className="ml-2 text-xs text-slate-500">completed</span>
        </div>
      </div>
    </div>
  );
};

