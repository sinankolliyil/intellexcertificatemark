"use client";

import React, { useState, useMemo } from "react";
import { Student } from "@/types/assessment";
import { calculateStudentStats } from "@/lib/calculations";
import { StatsCards } from "./StatsCards";
import { StudentCard } from "./StudentCard";
import { Search, Filter, ArrowUpDown, UserPlus, Info } from "lucide-react";

interface DashboardProps {
  students: Student[];
  onAddStudent: () => void;
  onEvaluate: (studentId: string) => void;
  onDownload: (studentId: string) => void;
  onEdit: (studentId: string) => void;
  onDelete: (studentId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  students,
  onAddStudent,
  onEvaluate,
  onDownload,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "complete" | "pending">("all");
  const [sortBy, setSortBy] = useState<"updated" | "name" | "scoreHigh" | "scoreLow">("updated");

  // Aggregate stats
  const total = students.length;
  let fullyAssessedCount = 0;
  let totalScoreSum = 0;

  students.forEach((s) => {
    const stats = calculateStudentStats(s);
    if (stats.isFullyAssessed && stats.finalPercentage !== null) {
      fullyAssessedCount++;
      totalScoreSum += stats.finalPercentage;
    }
  });

  const classAverage =
    fullyAssessedCount > 0
      ? `${(totalScoreSum / fullyAssessedCount).toFixed(1)}%`
      : "—";

  // Filter & sort students
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.track.toLowerCase().includes(query) ||
          student.batch.toLowerCase().includes(query) ||
          student.evaluator.toLowerCase().includes(query);

        if (!matchesQuery) return false;

        const stats = calculateStudentStats(student);
        if (statusFilter === "complete") return stats.isFullyAssessed;
        if (statusFilter === "pending") return !stats.isFullyAssessed;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "scoreHigh" || sortBy === "scoreLow") {
          const statsA = calculateStudentStats(a);
          const statsB = calculateStudentStats(b);
          return sortBy === "scoreHigh"
            ? statsB.totalMarksObtained - statsA.totalMarksObtained
            : statsA.totalMarksObtained - statsB.totalMarksObtained;
        } else {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
      });
  }, [students, searchQuery, statusFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Codebase Storage Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 mb-6 flex items-start space-x-3 text-xs text-emerald-950">
        <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-bold">Automatic Persistent Auto-Save: </span>
          All newly added candidates, rubric scores, and evaluator comments are automatically saved and preserved as you work on this hosted site. Your changes remain saved when you refresh or return. You can also export a cohort CSV or JSON backup anytime.
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <StatsCards
        totalStudents={total}
        fullyAssessedCount={fullyAssessedCount}
        pendingCount={total - fullyAssessedCount}
        classAverage={classAverage}
      />

      {/* Filter & Search Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 mb-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate by name, ID, track, batch..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex items-center space-x-2">
          {/* Status Filter */}
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "complete" | "pending")}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="complete">Fully Assessed</option>
              <option value="pending">Pending Completion</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "updated" | "name" | "scoreHigh" | "scoreLow")}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
            >
              <option value="updated">Recently Updated</option>
              <option value="name">Name (A–Z)</option>
              <option value="scoreHigh">Score (High to Low)</option>
              <option value="scoreLow">Score (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEvaluate={onEvaluate}
              onDownload={onDownload}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <UserPlus className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            No Student Assessment Records Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            No candidates match your active search filters, or no students have been registered yet.
          </p>
          <button
            onClick={onAddStudent}
            className="inline-flex items-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            <span>Add New Student</span>
          </button>
        </div>
      )}
    </div>
  );
};

