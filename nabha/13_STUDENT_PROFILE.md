# 13 — Student Profile

**File:** `/src/pages/student/StudentProfile.jsx`
**Route:** `/student/profile`

---

## Screen Layout

### Header
- Back arrow ← (to home)
- Title: "My Profile"
- Edit button (pencil icon) → toggles edit mode

### Profile Card
- Large initial avatar (64px circle, indigo gradient)
- Student name (editable in edit mode)
- School ID (read-only)
- Grade (e.g. "Class 7A")
- School name

### Language Preference
- Label: "App Language"
- Three buttons: "English" | "ਪੰਜਾਬੀ" | "हिंदी"
- Active: `bg-indigo-600 text-white`
- On select: updates `LangContext` + calls `PATCH /api/users/:id` with `{ language }`

### Stats Section
| Stat | Value |
|------|-------|
| Lessons Completed | Count from progress |
| Quizzes Attempted | Count |
| Best Quiz Score | Highest score % |
| Total Points | `user.totalPoints` |
| Streak | Days in a row with activity |

### Badges Section
- Grid of earned badges (emoji + name label)
- Locked badges shown as greyed out with lock icon

### Progress by Subject
- Bar chart per subject (using Recharts `BarChart`)
- Shows average completion % per subject
- Horizontal bars, color-coded by subject

### Downloaded Lessons
- List of lessons currently saved for offline
- Each item: lesson title + size + "Remove" button
- "Remove" deletes from IndexedDB and Service Worker cache

### Change Password
- Button: "Change Password →"
- Opens modal with: Current Password | New Password | Confirm
- On submit: `PATCH /api/auth/change-password`

### Logout
- Button: "Sign Out"
- Style: `bg-rose-600/20 text-rose-400 border border-rose-500/30`
- On tap: confirmation dialog → clear auth + navigate to login

### Sync Status
- Last synced: "Synced 2 minutes ago"
- Manual sync button: "🔄 Sync Now"
- Only enabled when online

---

## Edit Mode
When edit icon tapped:
- Name field becomes editable input
- Save button appears: "Save Changes"
- Cancel button: "Cancel"
- On save: `PATCH /api/users/:id` with `{ name }`
