# intellexcertificatemark

## Intellex Student Assessment Tool

A standardized competency evaluation and marks management platform built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS.

### Shared database setup

Student records are stored in Supabase so the same records are available on every device. The app's `/api/students` endpoint reads and writes the database; browser storage is used only once to migrate records from an older version of this app.

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` from the Supabase project settings.
4. Add those same environment variables to the hosting provider, then redeploy the app.

Keep `SUPABASE_SECRET_KEY` secret and server-side only. Do not prefix it with `NEXT_PUBLIC_`. The server uses it to access the table; the SQL disables direct access to the table from anonymous and authenticated Supabase clients.

**Public access warning:** The app API itself has no login or authorization. Anyone who can reach the website can view, add, edit, restore, or delete student records. Since the records include names and assessment marks, use this public-edit mode only if that exposure is acceptable; otherwise, add authentication and authorization before publishing real student data. Changes are shared through the database and appear on another device when the page is opened or refreshed.

### Assessment Rubric Specifications
- **5 Categories & 38 Criteria**
- **Exact 495 Maximum Marks** (Category 1: 95, Categories 2–5: 100 each)
- Comprehensive evaluation guidance for every criterion (What to Monitor, Scoring Bands, Fallback Tasks)
- **Scoring Bands**:
  - 86–100%: Exceptional/Lead
  - 76–85%: Strong Independent
  - 61–75%: Autonomous Standard
  - 41–60%: Basic Ability
  - 21–40%: Heavy Guidance
  - 0–20%: Unsatisfactory
- Unassessed criteria rule: Criteria remain marked as `NOT ASSESSED`, never treated as 0. Final percentage and evaluation band are only computed when all 38 criteria are assessed.
- Individual and Cohort CSV export, official printable PDF mark sheets, and JSON backup/restore.

### Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

