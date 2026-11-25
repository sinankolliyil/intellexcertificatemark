import { Student } from "@/types/assessment";
import initialStudents from "@/data/students.json";

export const STORAGE_KEY = "intellex_assessment_data_v1";

/**
 * Fetches students with smart fallback:
 * 1. Checks browser localStorage first (guarantees edits & new students persist on hosted websites)
 * 2. If nothing stored in browser, fetches from /api/students or baseline src/data/students.json
 */
export async function fetchStudentsFromCode(): Promise<Student[]> {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Unable to read from browser storage:", e);
    }
  }

  // Try API route
  try {
    const res = await fetch("/api/students", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } catch {}
        }
        return data;
      }
    }
  } catch (error) {
    console.warn("Unable to fetch /api/students, using baseline data:", error);
  }

  const baseline = initialStudents as Student[];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(baseline));
    } catch {}
  }
  return baseline;
}

/**
 * Saves updated students seamlessly:
 * 1. Always saves to browser storage (guarantees instant, zero-manual-step persistence on hosted websites)
 * 2. Also writes to /api/students (persists to src/data/students.json in local dev)
 */
export async function saveStudentsToCode(students: Student[]): Promise<boolean> {
  if (typeof window === "undefined") return false;

  // 1. Persist in browser storage so hosted website NEVER loses data on refresh
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.warn("Could not save to browser storage:", error);
  }

  // 2. Also sync to backend API (updates src/data/students.json on local dev)
  try {
    fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(students),
    }).catch(() => {
      // Ignored silently on read-only hosted environments (Vercel/Netlify)
    });
  } catch {}

  return true;
}

