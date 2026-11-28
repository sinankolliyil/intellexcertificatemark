import { NextResponse } from "next/server";
import initialStudents from "@/data/students.json";
import { Student } from "@/types/assessment";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStudentArray(value: unknown): value is Student[] {
  return (
    Array.isArray(value) &&
    value.every(
      (student) =>
        isRecord(student) &&
        typeof student.id === "string" &&
        typeof student.studentId === "string" &&
        typeof student.name === "string" &&
        typeof student.track === "string" &&
        typeof student.batch === "string" &&
        typeof student.evaluator === "string" &&
        typeof student.assessmentDate === "string" &&
        typeof student.createdAt === "string" &&
        typeof student.updatedAt === "string" &&
        isRecord(student.marks) &&
        isRecord(student.comments)
    )
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (isRecord(error) && typeof error.message === "string") return error.message;
  return "Unexpected database error.";
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isRecord(value)) return value;

  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])])
  );
}

function isInitialDataset(students: Student[]): boolean {
  return (
    JSON.stringify(canonicalize(students)) ===
    JSON.stringify(canonicalize(initialStudents))
  );
}

function mergeStudents(current: Student[], incoming: Student[]): Student[] {
  const merged = [...current];

  for (const candidate of incoming) {
    const index = merged.findIndex(
      (student) =>
        student.id === candidate.id ||
        (student.studentId && student.studentId === candidate.studentId)
    );

    if (index === -1) {
      merged.push(candidate);
      continue;
    }

    const currentTime = Date.parse(merged[index].updatedAt);
    const incomingTime = Date.parse(candidate.updatedAt);
    if (incomingTime > currentTime) {
      merged[index] = candidate;
    }
  }

  return merged;
}

async function getStudentsFromDatabase(): Promise<Student[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("student_data")
    .select("students")
    .eq("id", "students")
    .maybeSingle();

  if (error) throw error;

  if (data) {
    if (!isStudentArray(data.students)) {
      throw new Error("The shared database contains invalid student data.");
    }
    return data.students;
  }

  const { error: initializeError } = await supabase
    .from("student_data")
    .upsert(
      { id: "students", students: initialStudents as Student[] },
      { onConflict: "id", ignoreDuplicates: true }
    );

  if (initializeError) throw initializeError;

  const { data: initializedData, error: readError } = await supabase
    .from("student_data")
    .select("students")
    .eq("id", "students")
    .single();

  if (readError) throw readError;
  if (!isStudentArray(initializedData.students)) {
    throw new Error("The shared database contains invalid student data.");
  }
  return initializedData.students;
}

export async function GET() {
  try {
    return NextResponse.json(await getStudentsFromDatabase());
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Unable to load shared student data:", message);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const isInitialization = isRecord(body) && body.initialize === true;
  const students = Array.isArray(body)
    ? body
    : isRecord(body) && Array.isArray(body.students)
      ? body.students
      : null;

  if (!isStudentArray(students)) {
    return NextResponse.json({ error: "Invalid student data." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    let studentsToSave = students;

    if (isInitialization) {
      const { data: currentData, error: readError } = await supabase
        .from("student_data")
        .select("students")
        .eq("id", "students")
        .maybeSingle();

      if (readError) throw readError;

      if (currentData) {
        if (!isStudentArray(currentData.students)) {
          throw new Error("The shared database contains invalid student data.");
        }

        studentsToSave = isInitialDataset(currentData.students)
          ? students
          : mergeStudents(currentData.students, students);
      }
    }

    const { error } = await supabase
      .from("student_data")
      .upsert(
        {
          id: "students",
          students: studentsToSave,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) throw error;

    return NextResponse.json({
      success: true,
      count: studentsToSave.length,
      ...(isInitialization ? { migrated: true } : {}),
    });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Unable to save shared student data:", message);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
