# 17 — Teacher Analytics Dashboard

**File:** `/src/pages/teacher/TeacherAnalytics.jsx`
**Route:** `/teacher/analytics`

---

## Screen Layout

### Filters Row
- "Grade" dropdown (6A / 7A / 8A / All)
- "Subject" dropdown (all subjects)
- "Date Range" picker (This Week / This Month / Custom)
- "Export" button → downloads CSV report

---

## Section 1 — Class Summary Cards (horizontal scroll or 2×2 grid)

| Card | Metric | Color |
|------|--------|-------|
| Average Quiz Score | % across all quizzes | Emerald / Amber / Red |
| Lesson Completion | % students finished ≥1 lesson | Indigo |
| Active Students | Count with activity this week | Violet |
| At-Risk Students | Count with <40% quiz average | Rose |

---

## Section 2 — Quiz Scores Bar Chart
- Component: `<BarChart />` from Recharts
- X-axis: Student first names
- Y-axis: Score out of total (e.g. 0–10)
- Bar color:
  - Green: ≥80%
  - Amber: ≥60%
  - Red: <60%
- Tooltip on hover: full name + exact score + date
- Dropdown above: "Select Quiz" to switch datasets

---

## Section 3 — Lesson Completion Donut Chart
- Component: `<PieChart />` from Recharts
- Segments: Completed | In Progress | Not Started
- Colors: Emerald | Amber | Slate
- Center label: total students
- Legend below

---

## Section 4 — Per-Student Progress Table

### Table Columns
| Column | Details |
|--------|---------|
| # | Row number |
| Student Name | With online dot indicator |
| Attendance | Present / Absent badge |
| Lessons Done | X / Total |
| Avg. Quiz Score | Percentage, colored |
| Progress Bar | Width = avg completion |
| Last Active | "2 hours ago", "3 days ago" |
| Status | 🟢 On Track / 🟡 Needs Attention / 🔴 At Risk |

### Row Actions
- Tap row: expand to see per-lesson breakdown for that student
- "Message Student" link in expanded row → opens chat with pre-filled name

### Table Features
- Sort by any column (tap header)
- Search bar: filter by student name
- Pagination: 10 students per page

---

## Section 5 — Subject Performance Radar / Bar
- Recharts `RadarChart` or grouped `BarChart`
- Shows average score per subject
- Helps teacher identify which subject needs more attention

---

## Section 6 — Activity Heatmap (weekly)
- 7-column grid (Mon–Sun) × 4 rows (last 4 weeks)
- Each cell: number of active students that day
- Color intensity: more activity = darker indigo
- Hover tooltip: "24 students active on Tuesday"

---

## Export
- "Export CSV" button → downloads table as CSV
- Fields: Name, School ID, Grade, Lessons Completed, Avg Score, Last Active
- Calls: `GET /api/progress/export?schoolId={id}&grade={grade}` → CSV response

---

## API Calls
1. `GET /api/progress?grade={grade}&schoolId={schoolId}` — all progress records
2. `GET /api/users?role=student&schoolId={schoolId}&grade={grade}` — student list
3. `GET /api/quiz/results?grade={grade}` — all quiz results
4. All data client-side filtered when dropdowns change (no re-fetch for filters)
