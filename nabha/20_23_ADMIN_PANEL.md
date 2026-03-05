# 20–23 — Admin Panel

---

# 20 — Admin Overview

**File:** `/src/pages/admin/AdminOverview.jsx`
**Route:** `/admin/home`

## Header
- "Admin Panel" title
- School name (e.g. "Govt. Senior Secondary School, Nabha")
- Last sync timestamp

## Stats Grid (2×2)
| Card | Metric |
|------|--------|
| Total Students | Count |
| Total Teachers | Count |
| Active Today | Users with activity in last 24h |
| Lessons Published | Total across all teachers |

## System Health
- API Server status: 🟢 / 🔴
- Database status: 🟢 / 🔴
- Storage usage: "2.4 GB / 10 GB" progress bar
- Last backup: timestamp

## Recent Registrations
- List: last 5 new users (name + role + date joined)

## Bottom Nav (Admin)
4 tabs: Overview 🏠 | Users 👥 | Content 📁 | Reports 📊

---

# 21 — Admin User Management

**File:** `/src/pages/admin/AdminUsers.jsx`
**Route:** `/admin/users`

## Tabs
- "Students" | "Teachers"

## User Table
Columns: Name | School ID | Grade (students) / Subject (teachers) | Status | Joined | Actions

### Actions per User
- "Edit" → edit modal (name, grade, language)
- "Reset Password" → sends temporary password
- "Deactivate" → sets `isActive: false`
- "Delete" → confirmation modal → hard delete

## Add New Student
- Button: "+ Add Student"
- Modal fields: Name | School ID | Grade | Phone | Language
- On submit: `POST /api/users` with `role: "student"`
- System generates temporary password, admin shares with student

## Add New Teacher
- Button: "+ Add Teacher"
- Modal fields: Name | Teacher ID | Subject | Email | Phone
- On submit: `POST /api/users` with `role: "teacher"`
- Email sent with login credentials

## Bulk Upload
- "Upload CSV" → upload .csv with columns: name, schoolId, grade, phone, language
- Preview table shown → "Import X students"
- `POST /api/users/bulk`

## Search & Filter
- Search by name or school ID
- Filter by grade / subject / status

---

# 22 — Admin Content Management

**File:** `/src/pages/admin/AdminContent.jsx`
**Route:** `/admin/content`

## Sections

### Digital Literacy Modules
- List of admin-created modules (not tied to a teacher)
- These are school-wide, available to all students
- "+ Upload Module" → same form as Lesson Builder
- Modules: "Computer Basics", "Internet Safety", "Typing Practice", etc.

### Course Material Bank
- Global library of lessons teachers can reference
- Filter by subject / grade / language
- "Assign to Class" button per lesson

### Content Localization
- Switch between EN / PA / HI views
- Shows missing translations (red indicators)
- "Add Translation" button per lesson/quiz

### Storage Manager
- List of uploaded files with size
- Sort by size descending
- "Delete" button with confirmation
- Total usage indicator

---

# 23 — Admin Reports

**File:** `/src/pages/admin/AdminReports.jsx`
**Route:** `/admin/reports`

## Report Types

### School-Wide Progress Report
- Overall completion rate across all classes
- Subject-wise averages (bar chart)
- Week-over-week trend (line chart)

### Teacher Activity Report
- Per teacher: lessons created, quizzes run, students tracked
- Table with export

### Connectivity Log
- Log of when school went offline/online
- Days with zero syncs (potential connectivity issues)
- Helps identify infrastructure problems

### Quiz Performance Report
- All quizzes: pass rate, average score, most-missed questions
- Filter by subject, grade, teacher

## Export Options
- All reports exportable as CSV or PDF
- `GET /api/reports/:type?format=csv` or `?format=pdf`

## Schedule Report
- "Email weekly report to:" admin email input
- Sends every Monday 8 AM
