# intellexcertificatemark

## Intellex Student Assessment Tool

A standardized competency evaluation and marks management platform built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS.

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

