import { Student } from "@/types/assessment";
import { SAMPLE_STUDENTS } from "@/data/sampleStudents";

export const STORAGE_KEY = "intellex_assessment_data_v1";

export function getStoredStudents(): Student[] {
  if (typeof window === "undefined") {
    return SAMPLE_STUDENTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to parse students from localStorage:", error);
  }

  // Fallback to sample students and persist
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_STUDENTS));
  } catch (e) {
    console.error("Failed to write initial students to localStorage:", e);
  }
  return SAMPLE_STUDENTS;
}

export function saveStoredStudents(students: Student[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return true;
  } catch (error) {
    console.error("Failed to save students to localStorage:", error);
    return false;
  }
}

export function updateStoredStudentsWithNewData(incoming: Student[]): Student[] {
  const current = getStoredStudents();
  const merged = [...current];

  incoming.forEach((candidate) => {
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

  saveStoredStudents(merged);
  return merged;
}

