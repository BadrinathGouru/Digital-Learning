# 08 — Student Home Dashboard

**File:** `/src/pages/student/StudentHome.jsx`

---

## Route
`/student/home` — default tab after student login

---

## Screen Layout (top → bottom, mobile portrait)

### A. Header Bar (sticky)
- Left: 🎓 logo + "Vidya Setu" title + "Student Portal" subtitle
- Right: Language selector dropdown + online/offline dot indicator + logout icon
- Background: `bg-slate-900/95 backdrop-blur`

### B. Offline Banner (conditional)
- Shows only when `navigator.onLine === false`
- Component: `<OfflineBanner />`
- Yellow banner: "⚡ You're offline — learning from saved content"
- Subtext: "Progress is saved locally and will sync when you reconnect"

### C. Welcome / Hero Card
- Full-width card, `mx-4 mt-4`
- Background: gradient `from-indigo-600 via-indigo-700 to-violet-800`
- Decorative circles (absolute positioned, `bg-white/5`)
- **Content:**
  - Label: "Welcome back" (indigo-200, 10px uppercase tracking)
  - Student Name: large, bold, white
  - School ID: indigo-200, 14px
- **Stats Row (3 columns):**
  - Lessons Completed (count)
  - Quizzes Done (count)
  - Badges Earned (count)
  - Separated by thin white/20 vertical dividers

#### Stats Row Data Source
- Pull from `user.progress` array in AuthContext
- Count `status === "completed"` for lessons
- Count quiz attempts from Progress collection

### D. Badges Section
- Label: "Your Badges" (slate-400, 12px uppercase)
- Container: `bg-slate-800/60 rounded-xl p-3 border border-white/5`
- Shows emoji badges: ⭐ 🏅 🔥 💡 🌟
- Each badge has a tooltip (title attribute) with badge name
- If no badges: "Complete quizzes to earn your first badge! 🎯"

### E. Continue Learning (conditional)
- Shows only if there is a lesson `status === "in_progress"`
- Label: "Continue Where You Left Off"
- Single lesson card with progress bar
- **Button:** "Continue →" → navigates to LessonViewer at saved timestamp

### F. Today's Lessons Section
- Label: "Today's Lessons" (slate-400, 12px uppercase)
- Shows first 3 lessons from the API filtered by student's grade
- Each lesson: `<LessonCard />` component (see below)

### G. Quick Quiz Prompt (conditional)
- Shows if there's a pending quiz (not attempted)
- Card with amber accent: "📝 Quiz waiting: [Quiz Title]"
- **Button:** "Take Quiz →" → navigates to QuizRunner

---

## LessonCard Component (in Home context)
Each card contains:
- Subject icon (colored based on subject)
- Lesson title (truncated to 1 line)
- Subject name + duration
- Progress bar (if in_progress)
- **Offline badge:** "✓ Saved" (emerald) if cached, "⬇ Save" button if not
  - "Save" button: calls `lessonService.downloadForOffline(lessonId)` → stores in IndexedDB

---

## Bottom Navigation
- 4 tabs: Home 🏠 | Lessons 📚 | Quizzes ✏️ | Chat 💬
- Active tab: `text-indigo-400` + top accent line
- Inactive: `text-slate-500`
- Fixed to bottom, `z-50`

---

## API Calls (on mount)
1. `GET /api/lessons?grade={grade}&limit=3` → today's lessons
2. `GET /api/progress/{studentId}` → progress data for stats + continue learning
3. If offline: read from IndexedDB `lessons` store

---

## State
```js
{
  lessons: [],          // Today's 3 lessons
  progress: [],         // All progress records
  badges: [],           // From user.badges
  isOnline: Boolean,    // From useOffline hook
  isLoading: Boolean
}
```

---

## Interactions & Buttons Summary
| Element | Action |
|---------|--------|
| Lesson card tap | Navigate to `/student/lesson/:id` |
| "Save" button | Download lesson to IndexedDB, update button to "✓ Saved" |
| "Continue →" button | Navigate to lesson at saved progress % |
| "Take Quiz →" button | Navigate to `/student/quiz/:id` |
| Badge icon hover | Show tooltip with badge name |
| Logout icon | Clear auth state, navigate to login |
| Language selector | Change `LangContext`, re-render all text |
| Online/offline dot | Display only, no action |
