"use client";

import React from "react";
import { Student } from "@/types/assessment";
import { CRITERIA_CATEGORIES, TOTAL_POSSIBLE_MARKS, TOTAL_CRITERIA_COUNT } from "@/data/criteriaData";
import { calculateStudentStats } from "@/lib/calculations";

interface PrintableReportProps {
  student: Student;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ student }) => {
  const stats = calculateStudentStats(student);

  return (
    <div id="printable-report-section" className="hidden print:block p-8 bg-white text-slate-900 max-w-4xl mx-auto">
      {/* Institutional Document Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="w-10 h-10 rounded bg-slate-900 text-amber-400 font-extrabold flex items-center justify-center text-lg border border-slate-800">
              IX
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight uppercase font-serif text-slate-900">
                INTELLEX ACADEMY
              </h1>
              <p className="text-xs font-semibold text-slate-600 tracking-wider uppercase">
                Engineering Assessment & Competency Evaluation Board
              </p>
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-slate-600">
          <div className="font-mono font-bold text-slate-900">
            REF: ITX-RPT-{student.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}
          </div>
          <div>Issued: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          <div>Standard Rubric: 38 Criteria / 495 Marks</div>
        </div>
      </div>

      {/* Candidate Profile Details Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs mb-6">
        <div>
          <span className="text-slate-500 font-medium block">Candidate Name:</span>
          <strong className="text-sm text-slate-900">{student.name}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-medium block">Student ID:</span>
          <strong className="font-mono text-slate-900">{student.studentId || "N/A"}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-medium block">Specialization / Track:</span>
          <strong className="text-slate-900">{student.track}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-medium block">Cohort / Batch:</span>
          <strong className="text-slate-900">{student.batch}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-medium block">Lead Evaluator:</span>
          <strong className="text-slate-900">{student.evaluator || "Assessor"}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-medium block">Evaluation Date:</span>
          <strong className="text-slate-900">{student.assessmentDate}</strong>
        </div>
      </div>

      {/* Summary Score Boxes */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="border border-slate-300 rounded-lg p-3 bg-white">
          <div className="text-2xl font-extrabold font-mono text-slate-900">
            {stats.totalMarksObtained} <span className="text-xs text-slate-500 font-normal">/ {TOTAL_POSSIBLE_MARKS}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-600 uppercase mt-1">
            Total Marks Obtained
          </div>
        </div>

        <div className="border border-slate-300 rounded-lg p-3 bg-white">
          <div className="text-2xl font-extrabold font-mono text-slate-900">
            {stats.isFullyAssessed && stats.finalPercentage !== null ? (
              `${stats.finalPercentage.toFixed(1)}%`
            ) : (
              <span className="text-sm font-bold text-amber-700">NOT ASSESSED</span>
            )}
          </div>
          <div className="text-[11px] font-bold text-slate-600 uppercase mt-1">
            Overall Percentage
          </div>
        </div>

        <div className="border border-slate-300 rounded-lg p-3 bg-white">
          <div className="text-base font-extrabold text-slate-900 mt-1">
            {stats.isFullyAssessed ? (
              stats.evaluationLevel.label
            ) : (
              <span className="text-xs text-amber-700 font-bold">
                INCOMPLETE ({stats.totalAssessed}/{TOTAL_CRITERIA_COUNT})
              </span>
            )}
          </div>
          <div className="text-[11px] font-bold text-slate-600 uppercase mt-1">
            Evaluation Band Level
          </div>
        </div>
      </div>

      {/* Performance Bands Legend */}
      <div className="text-[10px] text-slate-600 bg-slate-100/80 p-2.5 rounded border border-slate-200 mb-6 text-center">
        <span className="font-bold text-slate-800">Scoring Bands: </span>
        0–20% Unsatisfactory | 21–40% Heavy Guidance | 41–60% Basic Ability | 61–75% Autonomous Standard | 76–85% Strong Independent | 86–100% Exceptional/Lead
      </div>

      {/* Detailed Criterion Table */}
      <table className="w-full text-left text-xs border border-slate-300 mb-8">
        <thead>
          <tr className="bg-slate-900 text-white font-semibold">
            <th className="p-2 border-b border-slate-300">Assessment Criterion</th>
            <th className="p-2 border-b border-slate-300 text-center w-24">Marks</th>
            <th className="p-2 border-b border-slate-300 text-center w-28">Status</th>
            <th className="p-2 border-b border-slate-300">Evaluator Qualitative Feedback</th>
          </tr>
        </thead>
        <tbody>
          {CRITERIA_CATEGORIES.map((cat) => {
            const catStat = stats.categoryStats.find((cs) => cs.categoryId === cat.id);
            return (
              <React.Fragment key={cat.id}>
                {/* Category Header Row */}
                <tr className="bg-slate-200 font-bold text-slate-900 border-t border-b border-slate-300">
                  <td colSpan={4} className="p-2 text-xs">
                    {cat.name} — Subtotal: {catStat?.marksObtained ?? 0} / {cat.maxMarks} Marks ({catStat?.assessedCount ?? 0}/{cat.criteria.length} Assessed)
                  </td>
                </tr>

                {/* Criteria Rows */}
                {cat.criteria.map((crit, idx) => {
                  const rawMark = student.marks ? student.marks[crit.id] : undefined;
                  const isAssessed = rawMark !== undefined && rawMark !== null && !isNaN(Number(rawMark));
                  const comment = student.comments ? (student.comments[crit.id] || "—") : "—";

                  return (
                    <tr key={crit.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="p-2 font-medium text-slate-900">
                        {idx + 1}. {crit.name}
                      </td>
                      <td className="p-2 text-center font-mono font-bold">
                        {isAssessed ? (
                          <span>{rawMark} / {crit.maxMarks}</span>
                        ) : (
                          <span className="text-slate-400 font-normal">— / {crit.maxMarks}</span>
                        )}
                      </td>
                      <td className="p-2 text-center font-semibold">
                        {isAssessed ? (
                          <span className="text-emerald-700">ASSESSED</span>
                        ) : (
                          <span className="text-amber-700">NOT ASSESSED</span>
                        )}
                      </td>
                      <td className="p-2 text-slate-700 text-[11px] italic">
                        {comment}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Signatures & Certification */}
      <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-300 text-xs">
        <div>
          <div className="border-b border-slate-400 pb-1 mb-2">
            <strong>Evaluator Signature:</strong> {student.evaluator || "Assessor"}
          </div>
          <div className="text-slate-500">{student.evaluatorTitle || "Lead Engineering Evaluator"}</div>
        </div>

        <div>
          <div className="border-b border-slate-400 pb-1 mb-2">
            <strong>Student Acknowledgement:</strong> {student.name}
          </div>
          <div className="text-slate-500">Date: ___________________________________</div>
        </div>
      </div>
    </div>
  );
};

