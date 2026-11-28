"use client";

import React, { useState, useEffect } from "react";
import { Student } from "@/types/assessment";
import { fetchStudentsFromCode, saveStudentsToCode } from "@/lib/storage";
import { downloadIndividualCSV, exportAllStudentsCSV, exportBackupJSON } from "@/lib/exportUtils";
import { calculateStudentStats } from "@/lib/calculations";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { AssessmentView } from "@/components/AssessmentView";
import { AddStudentModal } from "@/components/Modals/AddStudentModal";
import { EditStudentModal } from "@/components/Modals/EditStudentModal";
import { DeleteConfirmModal } from "@/components/Modals/DeleteConfirmModal";
import { DownloadMarksModal } from "@/components/Modals/DownloadMarksModal";
import { BackupRestoreModal } from "@/components/Modals/BackupRestoreModal";
import { PrintableReport } from "@/components/PrintableReport";

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [activeView, setActiveView] = useState<"dashboard" | "assess">("dashboard");
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadStudent, setDownloadStudent] = useState<Student | null>(null);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // Student currently selected for printing
  const [printCandidate, setPrintCandidate] = useState<Student | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStudents() {
      try {
        const data = await fetchStudentsFromCode();
        if (!cancelled) {
          setStudents(data);
          setLoadError(null);
          setIsLoaded(true);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : "Unable to load shared student data.");
        }
      }
    }

    loadStudents();
    return () => {
      cancelled = true;
    };
  }, [loadAttempt]);

  useEffect(() => {
    if (!isLoaded) return;

    setSaveError(null);
    setSaveStatus("saving");
    const timeout = window.setTimeout(async () => {
      try {
        await saveStudentsToCode(students);
        setSaveError(null);
        setSaveStatus("saved");
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : "Unable to save shared student data.");
        setSaveStatus("idle");
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [students, isLoaded]);

  // Handle Add Student
  const handleAddStudent = (
    newStudentData: Omit<Student, "id" | "createdAt" | "updatedAt" | "marks" | "comments">
  ) => {
    const newStudent: Student = {
      ...newStudentData,
      id: `stu_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      marks: {},
      comments: {},
    };

    const updated = [newStudent, ...students];
    setStudents(updated);

    // Immediately open assessment for this student
    setActiveStudentId(newStudent.id);
    setActiveView("assess");
  };

  // Handle Edit Student Details
  const handleSaveEditedStudent = (updatedData: Partial<Student> & { id: string }) => {
    const updated = students.map((s) => {
      if (s.id === updatedData.id) {
        return {
          ...s,
          ...updatedData,
          updatedAt: new Date().toISOString(),
        };
      }
      return s;
    });
    setStudents(updated);
  };

  // Handle Delete Student
  const handleDeleteStudent = (studentId: string) => {
    const updated = students.filter((s) => s.id !== studentId);
    setStudents(updated);
    if (activeStudentId === studentId) {
      setActiveView("dashboard");
      setActiveStudentId(null);
    }
  };

  // Handle Update Marks
  const handleUpdateMarks = (studentId: string, criterionId: string, mark: number | undefined) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newMarks = { ...s.marks };
          if (mark === undefined) {
            delete newMarks[criterionId];
          } else {
            newMarks[criterionId] = mark;
          }
          return {
            ...s,
            marks: newMarks,
            updatedAt: new Date().toISOString(),
          };
        }
        return s;
      })
    );
  };

  // Handle Update Comments
  const handleUpdateComments = (studentId: string, criterionId: string, comment: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            comments: {
              ...s.comments,
              [criterionId]: comment,
            },
            updatedAt: new Date().toISOString(),
          };
        }
        return s;
      })
    );
  };

  // Handle Download Marks Actions
  const handleTriggerPrintReport = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    setPrintCandidate(student);

    setTimeout(() => {
      window.print();
    }, 200);
  };

  const handleTriggerIndividualCsv = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const stats = calculateStudentStats(student);
    downloadIndividualCSV(student, stats);
  };

  // Handle JSON Restore / Update: update existing records with new data and append new students (no destructive full reset)
  const handleRestore = (imported: Student[]) => {
    const merged = [...students];
    imported.forEach((candidate) => {
      const idx = merged.findIndex(
        (s) => s.id === candidate.id || (s.studentId && candidate.studentId && s.studentId === candidate.studentId)
      );
      if (idx >= 0) {
        merged[idx] = {
          ...merged[idx],
          ...candidate,
          marks: {
            ...merged[idx].marks,
            ...candidate.marks,
          },
          comments: {
            ...merged[idx].comments,
            ...candidate.comments,
          },
          updatedAt: new Date().toISOString(),
        };
      } else {
        merged.push(candidate);
      }
    });
    setStudents(merged);
  };

  const handleRetrySave = async () => {
    setSaveError(null);
    setSaveStatus("saving");
    try {
      await saveStudentsToCode(students);
      setSaveStatus("saved");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Unable to save shared student data.");
      setSaveStatus("idle");
    }
  };

  const activeStudent = students.find((s) => s.id === activeStudentId) || null;

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-bold text-slate-900">
            {loadError ? "Unable to load shared student data" : "Loading shared student data..."}
          </h1>
          {loadError && (
            <>
              <p className="mt-2 text-sm text-rose-700">{loadError}</p>
              <p className="mt-2 text-sm text-slate-600">
                Check that Supabase is configured and its student_data table has been created.
              </p>
              <button
                type="button"
                onClick={() => setLoadAttempt((attempt) => attempt + 1)}
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Retry
              </button>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <Header
        onAddStudent={() => setIsAddModalOpen(true)}
        onExportAllCsv={() => exportAllStudentsCSV(students)}
        onOpenBackupRestore={() => setIsBackupModalOpen(true)}
        totalStudents={students.length}
      />
      <p className="bg-rose-50 px-4 py-2 text-center text-sm text-rose-800">
        Public access: anyone with this URL can view, edit, restore, or delete all student records.
      </p>
      <div aria-live="polite">
        {saveError ? (
          <div className="flex items-center justify-between gap-4 bg-rose-50 px-4 py-2 text-sm text-rose-800">
            <span>Could not save changes to the shared database: {saveError}</span>
            <button type="button" onClick={handleRetrySave} className="font-semibold underline">
              Retry save
            </button>
          </div>
        ) : saveStatus === "saving" ? (
          <p className="bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">Saving changes to shared database...</p>
        ) : saveStatus === "saved" ? (
          <p className="bg-emerald-50 px-4 py-2 text-center text-sm text-emerald-800">Changes saved to shared database</p>
        ) : null}
      </div>

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === "dashboard" || !activeStudent ? (
          <Dashboard
            students={students}
            onAddStudent={() => setIsAddModalOpen(true)}
            onEvaluate={(studentId) => {
              setActiveStudentId(studentId);
              setActiveView("assess");
            }}
            onDownload={(studentId) => {
              const student = students.find((s) => s.id === studentId) || null;
              setDownloadStudent(student);
              setIsDownloadModalOpen(true);
            }}
            onEdit={(studentId) => {
              const student = students.find((s) => s.id === studentId) || null;
              setEditingStudent(student);
              setIsEditModalOpen(true);
            }}
            onDelete={(studentId) => {
              const student = students.find((s) => s.id === studentId) || null;
              setDeletingStudent(student);
              setIsDeleteModalOpen(true);
            }}
          />
        ) : (
          <AssessmentView
            student={activeStudent}
            onBackToDashboard={() => setActiveView("dashboard")}
            onUpdateMarks={handleUpdateMarks}
            onUpdateComments={handleUpdateComments}
            onDownloadReport={(studentId) => handleTriggerPrintReport(studentId)}
            onDownloadCsv={(studentId) => handleTriggerIndividualCsv(studentId)}
          />
        )}
      </main>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStudent}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        student={editingStudent}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveEditedStudent}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        student={deletingStudent}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingStudent(null);
        }}
        onConfirm={handleDeleteStudent}
      />

      <DownloadMarksModal
        isOpen={isDownloadModalOpen}
        student={downloadStudent}
        onClose={() => {
          setIsDownloadModalOpen(false);
          setDownloadStudent(null);
        }}
        onPrintReport={handleTriggerPrintReport}
        onDownloadCsv={handleTriggerIndividualCsv}
      />

      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        students={students}
        onClose={() => setIsBackupModalOpen(false)}
        onExportBackup={() => exportBackupJSON(students)}
        onRestore={handleRestore}
      />

      {/* Printable Report Element (rendered into DOM for window.print()) */}
      {printCandidate && <PrintableReport student={printCandidate} />}
    </div>
  );
}

