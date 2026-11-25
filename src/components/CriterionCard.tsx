"use client";

import React, { useState } from "react";
import { Criterion } from "@/types/assessment";
import { HelpCircle, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

interface CriterionCardProps {
  criterion: Criterion;
  currentMark: number | undefined;
  currentComment: string | undefined;
  onMarkChange: (criterionId: string, mark: number | undefined) => void;
  onCommentChange: (criterionId: string, comment: string) => void;
  index: number;
}

export const CriterionCard: React.FC<CriterionCardProps> = ({
  criterion,
  currentMark,
  currentComment,
  onMarkChange,
  onCommentChange,
  index,
}) => {
  const [showGuidance, setShowGuidance] = useState(false);
  const [inputVal, setInputVal] = useState<string>(
    currentMark !== undefined && currentMark !== null ? String(currentMark) : ""
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync internal input state when currentMark changes from outside
  React.useEffect(() => {
    setInputVal(currentMark !== undefined && currentMark !== null ? String(currentMark) : "");
  }, [currentMark]);

  const handleInputChange = (val: string) => {
    setInputVal(val);

    if (val.trim() === "") {
      setValidationError(null);
      onMarkChange(criterion.id, undefined);
      return;
    }

    const num = Number(val);
    if (isNaN(num)) {
      setValidationError("Must be a valid number");
      return;
    }

    if (num < 0) {
      setValidationError("Cannot be negative");
      return;
    }

    if (num > criterion.maxMarks) {
      setValidationError(`Maximum is ${criterion.maxMarks}`);
      return;
    }

    setValidationError(null);
    onMarkChange(criterion.id, num);
  };

  const setPresetMark = (percentage: number) => {
    const calculated = Math.round((percentage / 100) * criterion.maxMarks);
    setInputVal(String(calculated));
    setValidationError(null);
    onMarkChange(criterion.id, calculated);
  };

  const handleClear = () => {
    setInputVal("");
    setValidationError(null);
    onMarkChange(criterion.id, undefined);
  };

  const isAssessed = currentMark !== undefined && currentMark !== null && !isNaN(Number(currentMark));

  return (
    <div
      id={`criterion-${criterion.id}`}
      className={`bg-white rounded-xl border transition-all duration-200 p-4 sm:p-5 shadow-sm ${
        isAssessed ? "border-slate-300" : "border-amber-200 bg-amber-50/20"
      }`}
    >
      {/* Header: Title, Max Marks, Assessed Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <h4 className="text-base font-bold text-slate-900 tracking-tight">
            {criterion.name}
          </h4>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
            Max: {criterion.maxMarks} Marks
          </span>

          {isAssessed ? (
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Assessed
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              NOT ASSESSED
            </span>
          )}
        </div>
      </div>

      {/* What Evaluator Should Monitor (Source Rubric Requirement) */}
      <div className="mt-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
        <strong className="text-slate-800">What You Monitor: </strong>
        {criterion.monitor}
      </div>

      {/* Mark Input & Quick Presets Section */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Input box */}
        <div className="flex items-center space-x-3">
          <label className="text-xs font-bold text-slate-700 flex-shrink-0">
            Awarded Marks:
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={criterion.maxMarks}
              step={1}
              value={inputVal}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="—"
              className={`w-24 px-3 py-1.5 text-sm font-mono font-bold text-center border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                validationError
                  ? "border-rose-400 bg-rose-50 text-rose-900 focus:ring-rose-200"
                  : isAssessed
                  ? "border-emerald-400 bg-emerald-50/30 text-slate-900 focus:ring-emerald-200"
                  : "border-slate-300 bg-white text-slate-900 focus:ring-blue-200"
              }`}
            />
            <span className="absolute right-2 top-1.5 text-xs text-slate-400 pointer-events-none">
              /{criterion.maxMarks}
            </span>
          </div>

          {/* Clear / Unassessed Button */}
          {isAssessed && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded text-xs inline-flex items-center"
              title="Reset to NOT ASSESSED"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>Clear</span>
            </button>
          )}

          {validationError && (
            <span className="text-xs text-rose-600 font-medium">
              {validationError}
            </span>
          )}
        </div>

        {/* Quick Percent Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
          {[0, 25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setPresetMark(pct)}
              className="px-2 py-1 text-[11px] font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* Evaluator Qualitative Comments */}
      <div className="mt-3">
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Evaluator Observations & Notes:
        </label>
        <textarea
          rows={2}
          value={currentComment || ""}
          onChange={(e) => onCommentChange(criterion.id, e.target.value)}
          placeholder={`Enter specific notes, strengths, or recommendations for ${criterion.name}...`}
          className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Toggle Rubric Guidance & Fallback Task Drawer */}
      <div className="mt-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowGuidance(!showGuidance)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showGuidance ? "Hide Scoring Guidance & Fallback Task" : "View Scoring Guidance & Fallback Task"}</span>
          {showGuidance ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showGuidance && (
          <div className="mt-2.5 p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-xs text-slate-700 space-y-2.5">
            <div>
              <div className="font-bold text-blue-900 uppercase text-[10px] tracking-wider mb-1">
                Scoring Guidance & Performance Bands:
              </div>
              <div className="whitespace-pre-line font-mono text-[11px] text-slate-800 bg-white/80 p-2.5 rounded border border-blue-100 leading-relaxed">
                {criterion.guidance}
              </div>
            </div>

            {criterion.fallback && (
              <div>
                <div className="font-bold text-amber-900 uppercase text-[10px] tracking-wider mb-1">
                  If No Real-Project Evidence → Fallback Assessment:
                </div>
                <div className="bg-amber-50/80 p-2.5 rounded border border-amber-200 text-amber-950 font-medium">
                  {criterion.fallback}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

