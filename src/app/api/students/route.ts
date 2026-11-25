import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Student } from "@/types/assessment";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "students.json");

export async function GET() {
  try {
    const rawData = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const students: Student[] = JSON.parse(rawData);
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error reading students file:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let studentsToSave: Student[] = [];

    if (Array.isArray(body)) {
      studentsToSave = body;
    } else if (body && Array.isArray(body.students)) {
      studentsToSave = body.students;
    } else {
      return NextResponse.json({ success: false, error: "Invalid payload format" }, { status: 400 });
    }

    // Write directly to project code/file on disk if filesystem is writable
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(studentsToSave, null, 2), "utf-8");
      return NextResponse.json({
        success: true,
        message: "Data saved directly to code (src/data/students.json)",
        count: studentsToSave.length
      });
    } catch (writeErr: unknown) {
      const writeMsg = writeErr instanceof Error ? writeErr.message : String(writeErr);
      // On read-only serverless platforms like Vercel, return 200 with readOnly flag so browser storage takes over cleanly
      return NextResponse.json({
        success: true,
        readOnly: true,
        message: "Hosted environment filesystem is read-only; browser persistence handles storage.",
        details: writeMsg
      });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error saving students:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
