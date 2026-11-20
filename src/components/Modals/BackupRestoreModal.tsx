"use client";

import React, { useState, useRef } from "react";
import { Student } from "@/types/assessment";
import { parseRestoreJSON } from "@/lib/exportUtils";
import { X, Database, Download, Upload, AlertCircle, CheckCircle2 } from "lucide-react";

interface BackupRestoreModalProps {
  isOpen: boolean;
  students: Student[];
  onClose: () => void;
  onExportBackup: () => void;
  onRestore: (importedStudents: Student[], mode: "replace" | "merge") => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  students,
  onClose,
  onExportBackup,
  onRestore,
}) => {
  const [candidateStudents, setCandidateStudents] = useState<Student[] | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setParseError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = parseRestoreJSON(text);
      if (res.success && res.data) {
        setCandidateStudents(res.data);
      } else {
        setParseError(res.error || "Unable to parse backup file.");
        setCandidateStudents(null);
      }
    };
    reader.onerror = () => {
      setParseError("Failed to read file from disk.");
      setCandidateStudents(null);
    };
    reader.readAsText(file);
  };

  const handleExecuteRestore = (mode: "replace" | "merge") => {
    if (!candidateStudents) return;
    onRestore(candidateStudents, mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Database className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Data Backup & Restore Management
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Backup Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Create JSON Backup Archive</span>
            </h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Downloads a snapshot containing all current candidate records, completed marks, and criterion feedback. Store this JSON file safely for archives or transferring between machines.
            </p>
            <button
              type="button"
              onClick={onExportBackup}
              disabled={students.length === 0}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>Download Backup JSON ({students.length} Students)</span>
            </button>
          </div>

          <div className="h-px bg-slate-200" />

          {/* Restore Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Upload className="w-4 h-4 text-blue-600" />
              <span>Restore from Backup File</span>
            </h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Upload an Intellex JSON backup file previously exported from this tool.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 border border-slate-200 rounded-lg cursor-pointer"
            />

            {parseError && (
              <div className="mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{parseError}</span>
              </div>
            )}

            {candidateStudents && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                <div className="flex items-center space-x-1.5 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Valid Backup Detected</span>
                </div>
                <p>
                  Found <strong>{candidateStudents.length}</strong> candidate assessment record(s) in {fileName}.
                </p>

                <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleExecuteRestore("merge")}
                    className="flex-1 py-1.5 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs"
                    title="Merges new students and updates existing IDs without wiping other records"
                  >
                    Merge with Existing
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExecuteRestore("replace")}
                    className="flex-1 py-1.5 px-3 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs"
                    title="Wipes all existing records and replaces them with this backup"
                  >
                    Replace All Data
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

