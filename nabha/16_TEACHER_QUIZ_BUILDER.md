# 16 — Teacher Quiz Builder

**File:** `/src/pages/teacher/TeacherQuizBuilder.jsx`
**Route:** `/teacher/quiz/new` | `/teacher/quiz/:id/edit`

---

## Quiz Builder Form

### Section 1 — Quiz Info
| Field | Type | Required |
|-------|------|---------|
| Quiz Title | Text input | ✅ |
| Linked Lesson | Dropdown (teacher's lessons) | ✅ |
| Subject | Auto-filled from lesson | ✅ |
| Grade | Auto-filled from lesson | ✅ |
| Language | Dropdown (EN / PA / HI) | ✅ |
| Time Limit | Number input (minutes, 0 = no limit) | ❌ |
| Passing Score | Slider (0–100%) | ✅ Default: 60% |
| Badge Awarded | Dropdown (⭐🏅🔥💡🌟) | ❌ |
| Allow retakes | Toggle | ON |

---

### Section 2 — Questions

#### Question List
- Numbered list of all added questions
- Drag to reorder (drag handle on left)
- Each question shows: type badge + first 40 chars of question text
- "Edit" button | "Delete" button per question

#### Add Question Button
- "+ Add Question" (indigo, full width)
- Opens "Question Editor" panel

---

### Question Editor Panel (inline or modal)

#### Question Type Selector
Three tabs:
- **MCQ** (Multiple Choice — 4 options)
- **True/False**
- **Fill in the Blank**

#### MCQ Fields
| Field | Type | Notes |
|-------|------|-------|
| Question text | Textarea | Supports Punjabi/Hindi |
| Option A | Text input | |
| Option B | Text input | |
| Option C | Text input | |
| Option D | Text input | |
| Correct answer | Radio (A/B/C/D) | |
| Points | Number input | Default: 1 |
| Explanation | Textarea | Shown after student answers |

#### True/False Fields
| Field | Type |
|-------|------|
| Question text | Textarea |
| Correct answer | Radio: True / False |
| Explanation | Textarea |

#### Fill in the Blank Fields
| Field | Type | Notes |
|-------|------|-------|
| Question text | Textarea | Use ___ to mark blank |
| Correct answer | Text input | Case-insensitive match |
| Alternate accepted answers | Tag input | Optional |
| Explanation | Textarea | |

#### Question Editor Buttons
- "Add Question" → appends to question list
- "Update" → (edit mode) updates existing
- "Cancel" → closes panel

---

## Preview Mode
- "Preview Quiz" button (top right)
- Opens quiz in student-mode view
- Shows all questions, can answer but doesn't save
- "Close Preview" → back to builder

---

## Action Buttons (bottom)
| Button | Action |
|--------|--------|
| "Save Quiz" | `POST /api/quiz` (create) or `PUT /api/quiz/:id` (update) |
| "Launch Live" | Save + immediately emit `quiz:start` via Socket.IO to class |
| "Cancel" | Back with unsaved warning |

---

## Live Quiz Launch Flow (from builder or overview)
1. Teacher taps "Launch Live"
2. Modal: "Launch quiz to Class 7A? (24 students online)"
3. Confirm → `quiz:start` socket event emitted
4. Students see: quiz appears instantly on their screen
5. Teacher dashboard shows live response count
6. Auto-ends when time limit hits OR teacher clicks "End Quiz"
7. Results broadcast to all: `quiz:results` event
