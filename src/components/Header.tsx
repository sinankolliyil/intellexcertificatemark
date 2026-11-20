"use client";

import React from "react";
import { Plus, Download, HardDrive, Database, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onAddStudent: () => void;
  onExportAllCsv: () => void;
  onOpenBackupRestore: () => void;
  totalStudents: number;
}

export const Header: React.FC<HeaderProps> = ({
  onAddStudent,
  onExportAllCsv,
  onOpenBackupRestore,
  totalStudents,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl tracking-wider border border-amber-300/40">
              IX
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-serif">
                  INTELLEX
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full tracking-wide">
                  ASSESSMENT SYSTEM
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden xs:block">
                Standardized Engineering Competency Rubric (38 Criteria · 495 Max Marks)
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Storage notice pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300" title="Data is saved in browser localStorage on this device">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Local Device Storage</span>
            </div>

            {/* Export All CSV Button */}
            <button
              onClick={onExportAllCsv}
              disabled={totalStudents === 0}
              className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download Master CSV of all enrolled students"
            >
              <Download className="w-3.5 h-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Cohort CSV</span>
            </button>

            {/* Backup / Restore Button */}
            <button
              onClick={onOpenBackupRestore}
              className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              title="Backup or restore assessment records as JSON"
            >
              <Database className="w-3.5 h-3.5 sm:mr-1.5 text-amber-400" />
              <span className="hidden sm:inline">Backup / Restore</span>
            </button>

            {/* Add Student Primary Action */}
            <button
              onClick={onAddStudent}
              className="inline-flex items-center px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 transition-colors shadow-sm shadow-amber-400/20"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-1.5 stroke-[2.5]" />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

