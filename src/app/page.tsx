"use client";

import React, { useState, useEffect } from "react";
import { Student } from "@/types/assessment";
import { getStoredStudents, saveStoredStudents } from "@/lib/storage";
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

  // Load students from localStorage upon mount
  useEffect(() => {
    const loaded = getStoredStudents();
    setStudents(loaded);
    setIsLoaded(true);
  }, []);

  // Sync to localStorage whenever students change
  useEffect(() => {
    if (isLoaded) {
      saveStoredStudents(students);
    }
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
    saveStoredStudents(updated);

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
    saveStoredStudents(updated);
  };

  // Handle Delete Student
  const handleDeleteStudent = (studentId: string) => {
    const updated = students.filter((s) => s.id !== studentId);
    setStudents(updated);
    saveStoredStudents(updated);
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
    saveStoredStudents(merged);
  };

  const activeStudent = students.find((s) => s.id === activeStudentId) || null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <Header
        onAddStudent={() => setIsAddModalOpen(true)}
        onExportAllCsv={() => exportAllStudentsCSV(students)}
        onOpenBackupRestore={() => setIsBackupModalOpen(true)}
        totalStudents={students.length}
      />

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

