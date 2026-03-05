# 09 — Student Lessons (List + Viewer)

---

## Lessons List Page
**File:** `/src/pages/student/StudentLessons.jsx`
**Route:** `/student/lessons`

### Layout

#### Header
- Title: "All Lessons" (white, bold)
- Search bar: "🔍 Search lessons..." — filters list client-side by title

#### Subject Filter Bar
- Horizontal scrollable row of pills
- Subjects: All | Mathematics | Science | English | History | Digital Literacy
- **Active pill:** `bg-indigo-600 text-white`
- **Inactive pill:** `bg-slate-800 text-slate-400`
- On tap: filters `lessons` array

#### Lesson Cards (vertical list)
Each card (`<LessonCard />`) contains:

| Element | Details |
|---------|---------|
| Subject colored icon box | 48×48, color coded per subject |
| Subject dot + label | Colored tag, 10px uppercase |
| Lesson title | White, semibold, 14px |
| Language + duration | Slate-400, 12px |
| Progress ring | SVG circle, right side, shows % complete |
| Progress percentage | Below ring, 10px |
| "Start" / "Continue" / "Review" button | Changes based on `status` |
| Offline button | "⬇ Save" or "✓ Offline" (emerald) |

#### Button States
| `status` | Primary Button | Color |
|----------|---------------|-------|
| `not_started` | "Start Lesson" | `bg-indigo-600` |
| `in_progress` | "Continue" | `bg-indigo-600` |
| `completed` | "Review" | `bg-slate-700` |

#### Empty State
- If no lessons match filter: "No lessons found for this subject yet."
- Icon: 📚

---

## API Calls
1. `GET /api/lessons?grade={grade}&language={lang}` — all lessons on mount
2. If offline: read from IndexedDB `lessons` store

---

## Offline Download Flow (per lesson)
1. User taps "⬇ Save"
2. Button shows loading spinner
3. Calls `lessonService.downloadForOffline(lessonId)`:
   - Fetches lesson JSON from API
   - If `contentUrl` is video: caches URL via Service Worker Cache API
   - If `pdfUrl` exists: fetches and stores PDF blob in IndexedDB
   - Saves lesson object to IndexedDB `lessons` store
4. Button updates to "✓ Offline" (emerald)
5. On failure: toast error "Download failed. Check connection."

---

## Lesson Viewer Page
**File:** `/src/pages/student/LessonViewer.jsx`
**Route:** `/student/lesson/:lessonId`

### Header
- Back arrow "←" → returns to lessons list
- Lesson title (truncated)
- Subject tag (colored)

### Content Area

#### Video Player (if contentUrl exists)
- Component: `<ReactPlayer />`
- Props: `lazy={true}`, `controls={true}`, `width="100%"`
- Offline: plays from cached blob URL via Service Worker
- Progress tracking: `onProgress` callback → saves every 10 seconds
  - Saves `{ lessonId, watchedPct }` to IndexedDB
  - If online: also calls `POST /api/progress/update`

#### PDF Viewer (if pdfUrl exists)
- Uses `<iframe>` with cached blob URL for offline
- Or: link "📄 Open PDF Notes" that opens in new tab

#### Lesson Notes (text content)
- Rendered markdown or plain text
- Supports Punjabi and Hindi characters (Unicode)

### Progress Auto-Save
- Every 10 seconds while watching: save watchedPct locally
- On video end: set `status = "completed"` in progress
- On unmount: save final position

### Take Quiz Button
- Shown at bottom after 80% lesson completion
- Style: full-width, `bg-indigo-600`
- Text: "Take Quiz for this Lesson →"
- On tap: navigate to `/student/quiz/:quizId`
- If no quiz linked: button hidden

### Bottom Info Bar
- Duration remaining
- "Downloaded" badge if offline-available
- Language indicator

---

## State (`LessonViewer`)
```js
{
  lesson: Object,          // Full lesson data
  currentPct: Number,      // 0–100 video progress
  status: String,          // not_started | in_progress | completed
  isOffline: Boolean,
  isLoading: Boolean
}
```
