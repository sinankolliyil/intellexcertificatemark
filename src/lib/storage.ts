import { Student } from "@/types/assessment";
import initialStudents from "@/data/students.json";

/**
 * Fetches students directly from the project codebase (src/data/students.json)
 * via the Next.js API route. Completely eliminates browser localStorage.
 */
export async function fetchStudentsFromCode(): Promise<Student[]> {
  if (typeof window === "undefined") {
    return initialStudents as Student[];
  }

  try {
    const res = await fetch("/api/students", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn("Unable to fetch /api/students, falling back to static code data:", error);
  }

  return initialStudents as Student[];
}

/**
 * Saves updated students directly into project files on disk (src/data/students.json)
 * via Next.js Route Handler with Node.js fs.
 */
export async function saveStudentsToCode(students: Student[]): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(students),
    });

    return res.ok;
  } catch (error) {
    console.error("Failed to write students to codebase file:", error);
    return false;
  }
}
