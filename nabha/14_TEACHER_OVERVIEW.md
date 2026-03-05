# 14 — Teacher Overview Dashboard

**File:** `/src/pages/teacher/TeacherOverview.jsx`
**Route:** `/teacher/home`

---

## Header Bar (sticky)
- Left: 🎓 logo + "Vidya Setu" + "Teacher Dashboard"
- Right: Language selector + online/offline dot + notification bell + logout

### Notification Bell
- Badge count (red dot) with unread announcement count
- On tap: slides in notification drawer from right
- Drawer lists recent student submissions + announcements

---

## Screen Layout (top → bottom)

### A. Teacher Hero Banner
- Gradient: `from-violet-700 to-indigo-800`
- Decorative circles (absolute)
- Content:
  - Label: "Teacher Dashboard" (violet-200, uppercase)
  - Teacher name (large, bold, white)
  - Subject + Class (e.g. "Science · Class 7A")
- **Stats Grid (3 columns):**
  - Total Students enrolled
  - Currently Online (from Socket.IO presence)
  - Present today (from attendance)

### B. Quick Stats Row (2 cards)
**Card 1 — Avg. Quiz Score**
- Large number: e.g. "76%"
- Progress bar below
- Color: emerald if ≥70%, amber if ≥50%, red if <50%

**Card 2 — Lessons Published**
- "2/3" format (published / total)
- Progress bar

### C. Live Class Control
*Shown when class is in session (teacher pressed "Start Class")*
- Banner: "🔴 Live — Class 7A Science"
- Student count: "24 of 38 online"
- **Buttons:**
  - "📊 Launch Live Quiz" → opens quiz picker modal
  - "📢 Broadcast Announcement" → opens announcement composer
  - "🛑 End Class" → confirmation modal → ends Socket.IO room

*When no class in session:*
- Button: "▶ Start Live Class" (full width, indigo)
- On tap: emit `class:start` socket event, update UI to live mode

### D. Live Roster (student list)
- Label: "Live Class Roster"
- Container: `bg-slate-800 rounded-2xl`
- Each row:
  - Student initial avatar (with online indicator dot)
  - Student name + attendance status
  - Quiz score (if quiz was run this session) or "—"
  - Online status: emerald dot (online) / slate dot (offline)
- Last row: "View All 38 Students →" link → Teacher Analytics

### E. Recent Activity Feed
- Label: "Recent Activity"
- Timeline of events:
  - "Simran completed Fractions Quiz — 90%"
  - "Ravi joined the class"
  - "3 students submitted Plant Biology quiz"
- Time-relative: "2 min ago", "5 min ago"

---

## Bottom Navigation (Teacher)
4 tabs: Overview 📊 | Lessons 📋 | Analytics 📈 | Chat 💬

---

## API Calls (on mount)
1. `GET /api/users?schoolId={schoolId}&role=student` — student list
2. `GET /api/lessons?createdBy={teacherId}` — teacher's lessons
3. Socket.IO: emit `presence:requestClassStatus` — get who's online
4. `GET /api/progress?schoolId={schoolId}&grade={grade}` — progress data for stats

---

## Buttons Summary
| Button | Action |
|--------|--------|
| "▶ Start Live Class" | Emit socket event, enable live mode |
| "📊 Launch Live Quiz" | Modal: pick a quiz → emit quiz:start |
| "📢 Broadcast" | Modal: compose announcement → emit + save |
| "🛑 End Class" | Confirm → emit class:end |
| "View All Students →" | Navigate to Analytics tab |
| Notification bell | Open notification drawer |
| Logout | Clear session, go to login |
