import { Student } from "@/types/assessment";

const LEGACY_STORAGE_KEY = "intellex_assessment_data_v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (typeof body.error === "string") return body.error;
  } catch {
    // Use the status text when the server does not return a JSON error.
  }
  return `Request failed (${response.status} ${response.statusText})`;
}

/**
 * Migrate this browser's previous local data into the shared database, then fetch
 * the current shared records.
 */
export async function fetchStudentsFromCode(): Promise<Student[]> {
  if (typeof window !== "undefined") {
    const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyData) {
      try {
        const students: unknown = JSON.parse(legacyData);
        if (Array.isArray(students)) {
          const migrationResponse = await fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initialize: true, students }),
          });
          if (!migrationResponse.ok) {
            throw new Error(await getErrorMessage(migrationResponse));
          }
          const migrationResult: unknown = await migrationResponse.json();
          if (!isRecord(migrationResult) || migrationResult.migrated !== true) {
            throw new Error("The server did not confirm the local data migration.");
          }
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        } else {
          console.warn("Ignoring invalid legacy assessment data in browser storage.");
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          console.warn("Ignoring invalid legacy assessment data in browser storage.");
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        } else {
          throw error;
        }
      }
    }
  }

  const response = await fetch("/api/students", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const students: unknown = await response.json();
  if (!Array.isArray(students)) {
    throw new Error("The shared database returned invalid student data.");
  }
  return students as Student[];
}

export async function saveStudentsToCode(students: Student[]): Promise<void> {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(students),
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}
