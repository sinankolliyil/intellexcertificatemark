import { Student, StudentStats } from "@/types/assessment";
import { CRITERIA_CATEGORIES, TOTAL_POSSIBLE_MARKS } from "@/data/criteriaData";
import { calculateStudentStats } from "@/lib/calculations";

export function escapeCsv(str: string | number | null | undefined): string {
  if (str === null || str === undefined) return "";
  return String(str).replace(/"/g, '""');
}

export function triggerDownload(content: string, filename: string, mimeType: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadIndividualCSV(student: Student, stats: StudentStats): void {
  let csv = "\uFEFF"; // UTF-8 BOM for Excel compatibility

  // 1. Header Metadata
  csv += `"INTELLEX STUDENT ASSESSMENT REPORT"\n`;
  csv += `"Student Name:","${escapeCsv(student.name)}"\n`;
  csv += `"Student ID:","${escapeCsv(student.studentId || "N/A")}"\n`;
  csv += `"Email:","${escapeCsv(student.email || "N/A")}"\n`;
  csv += `"Track / Specialization:","${escapeCsv(student.track || "General")}"\n`;
  csv += `"Batch / Cohort:","${escapeCsv(student.batch || "N/A")}"\n`;
  csv += `"Evaluator:","${escapeCsv(student.evaluator || "Unassigned")}"\n`;
  csv += `"Assessment Date:","${escapeCsv(student.assessmentDate || "N/A")}"\n`;
  csv += `"Total Assessed Criteria:","${stats.totalAssessed} of ${stats.totalCriteriaCount}"\n`;
  csv += `"Overall Marks:","${stats.totalMarksObtained} / ${stats.totalPossibleMarks}"\n`;
  csv += `"Final Percentage:","${stats.isFullyAssessed && stats.finalPercentage !== null ? stats.finalPercentage.toFixed(2) + '%' : 'NOT ASSESSED (All 38 criteria required)'}"\n`;
  csv += `"Evaluation Level:","${stats.isFullyAssessed ? stats.evaluationLevel.label : 'NOT ASSESSED'}"\n\n`;

  // 2. Category Summary
  csv += `"CATEGORY SUMMARY"\n`;
  csv += `"Category","Category Max Marks","Marks Awarded","Status","Category Percentage"\n`;
  stats.categoryStats.forEach(cs => {
    const pctStr = cs.isComplete && cs.percentage !== null ? `${cs.percentage.toFixed(1)}%` : "Pending";
    csv += `"${escapeCsv(cs.categoryName)}",${cs.maxMarks},${cs.marksObtained},"${cs.isComplete ? 'Complete' : 'Incomplete'}","${pctStr}"\n`;
  });
  csv += `\n`;

  // 3. Criterion-by-Criterion Table
  csv += `"DETAILED CRITERION ASSESSMENT"\n`;
  csv += `"Category","Criterion Name","Maximum Marks","Marks Awarded","Assessment Status","Evaluator Comments"\n`;

  CRITERIA_CATEGORIES.forEach(cat => {
    cat.criteria.forEach(crit => {
      const rawMark = student.marks ? student.marks[crit.id] : undefined;
      const isAssessed = rawMark !== undefined && rawMark !== null && !isNaN(Number(rawMark));
      const markStr = isAssessed ? Number(rawMark) : "NOT ASSESSED";
      const statusStr = isAssessed ? "ASSESSED" : "NOT ASSESSED";
      const comment = student.comments ? (student.comments[crit.id] || "") : "";

      csv += `"${escapeCsv(cat.shortName)}","${escapeCsv(crit.name)}",${crit.maxMarks},${typeof markStr === 'number' ? markStr : '"' + markStr + '"'},"${statusStr}","${escapeCsv(comment)}"\n`;
    });
  });

  const filename = `${(student.name || 'student').replace(/[^a-z0-9]/gi, '_').toLowerCase()}_assessment_report.csv`;
  triggerDownload(csv, filename, "text/csv;charset=utf-8;");
}

export function exportAllStudentsCSV(students: Student[]): void {
  if (students.length === 0) return;

  let csv = "\uFEFF";
  csv += `"INTELLEX - ALL STUDENTS ASSESSMENT MASTER RECORD"\n\n`;
  csv += `"Student Name","Student ID","Email","Track","Batch","Evaluator","Assessment Date","Assessed Criteria Count","Completion Status","Category 1: Technical (Max 95)","Category 2: Problem Solving (Max 100)","Category 3: Collaboration (Max 100)","Category 4: Communication (Max 100)","Category 5: Reliability (Max 100)","Total Marks Obtained","Overall Max Marks","Final Percentage","Evaluation Level"\n`;

  students.forEach(student => {
    const stats = calculateStudentStats(student);
    const c1 = stats.categoryStats[0]?.marksObtained ?? 0;
    const c2 = stats.categoryStats[1]?.marksObtained ?? 0;
    const c3 = stats.categoryStats[2]?.marksObtained ?? 0;
    const c4 = stats.categoryStats[3]?.marksObtained ?? 0;
    const c5 = stats.categoryStats[4]?.marksObtained ?? 0;

    const pctStr = stats.isFullyAssessed && stats.finalPercentage !== null ? stats.finalPercentage.toFixed(2) + "%" : "NOT ASSESSED";
    const levelStr = stats.isFullyAssessed ? stats.evaluationLevel.label : "NOT ASSESSED";
    const statusStr = stats.isFullyAssessed ? "Fully Assessed" : "Pending Completion";

    csv += `"${escapeCsv(student.name)}","${escapeCsv(student.studentId || '')}","${escapeCsv(student.email || '')}","${escapeCsv(student.track || '')}","${escapeCsv(student.batch || '')}","${escapeCsv(student.evaluator || '')}","${escapeCsv(student.assessmentDate || '')}",${stats.totalAssessed},"${statusStr}",${c1},${c2},${c3},${c4},${c5},${stats.totalMarksObtained},${TOTAL_POSSIBLE_MARKS},"${pctStr}","${levelStr}"\n`;
  });

  const filename = `intellex_all_students_assessment_${new Date().toISOString().split('T')[0]}.csv`;
  triggerDownload(csv, filename, "text/csv;charset=utf-8;");
}

export function exportBackupJSON(students: Student[]): void {
  const payload = {
    app: "Intellex Student Assessment Tool",
    version: "2.0-NextJS",
    exportDate: new Date().toISOString(),
    totalStudents: students.length,
    students
  };
  const jsonStr = JSON.stringify(payload, null, 2);
  const filename = `intellex_assessment_backup_${new Date().toISOString().split('T')[0]}.json`;
  triggerDownload(jsonStr, filename, "application/json");
}

export function parseRestoreJSON(fileText: string): { success: boolean; data?: Student[]; error?: string } {
  try {
    const parsed = JSON.parse(fileText);
    if (parsed && Array.isArray(parsed.students)) {
      return { success: true, data: parsed.students };
    }
    if (Array.isArray(parsed)) {
      return { success: true, data: parsed };
    }
    return { success: false, error: "JSON does not contain a recognizable list of student assessment records." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: "Invalid JSON format: " + msg };
  }
}

