# 15 — Teacher Lesson Builder

**File:** `/src/pages/teacher/LessonBuilder.jsx`
**Route:** `/teacher/lessons/new` (create) | `/teacher/lessons/:id/edit` (edit)

---

## Lessons List Page
**File:** `/src/pages/teacher/TeacherLessons.jsx`
**Route:** `/teacher/lessons`

### Header
- Title: "My Lessons"
- "+ New Lesson" button (indigo, top right) → navigate to `/teacher/lessons/new`

### Lesson Cards
Each card:
| Element | Details |
|---------|---------|
| Subject icon | Colored box |
| Subject + Published/Draft badge | Emerald "Published" / slate "Draft" |
| Lesson title | White, semibold |
| Language + student count | Slate-400 |
| Avg. completion bar | If published and has progress data |
| "Edit" button | Navigates to edit route |
| "View Analytics" button | Navigates to analytics filtered by this lesson |
| "Delete" button | Confirmation modal → `DELETE /api/lessons/:id` |
| "Publish/Unpublish" toggle | Switches `isPublished` → `PATCH /api/lessons/:id` |

---

## Lesson Builder Form

### Section 1 — Lesson Info
| Field | Type | Required | Notes |
|-------|------|---------|-------|
| Title | Text input | ✅ | Supports Punjabi/Hindi |
| Subject | Dropdown | ✅ | Mathematics / Science / English / History / Digital Literacy |
| Grade | Dropdown | ✅ | 6 / 7 / 8 / 9 / 10 |
| Language | Dropdown | ✅ | English / Punjabi / Hindi |
| Description | Textarea | ✅ | 500 char max |
| Tags | Tag input | ❌ | e.g. "fractions, math, punjabi" |

### Section 2 — Content Upload
| Field | Type | Notes |
|-------|------|-------|
| Video Upload | File input (mp4, max 500MB) | Uploads to S3/Firebase Storage |
| Video URL | Text input | Alternative: paste YouTube/direct URL |
| PDF Notes | File input (pdf, max 20MB) | Optional supplementary PDF |
| Thumbnail | Image upload (jpg/png) | Auto-generated from video if not provided |

#### Upload Flow
1. Teacher selects file
2. Frontend calls `POST /api/upload/presigned` → gets S3 presigned URL
3. Frontend uploads directly to S3 (bypass server for large files)
4. On success: `contentUrl` saved in lesson form state
5. Progress bar shown during upload

### Section 3 — Settings
| Field | Type | Default | Notes |
|-------|------|---------|-------|
| Allow offline download | Toggle | ON | Sets `isDownloadable` |
| Linked Quiz | Dropdown | None | Pick from teacher's created quizzes |
| Scheduled publish date | Date-time picker | None | Optional scheduling |
| Visible to grade | Multi-select | Current grade | Can share across grades |

### Action Buttons (bottom)
| Button | Action |
|--------|--------|
| "Save as Draft" | `POST /api/lessons` with `isPublished: false` |
| "Publish Now" | `POST /api/lessons` with `isPublished: true` |
| "Preview" | Opens lesson viewer with teacher's perspective |
| "Cancel" | Navigate back (confirm if unsaved changes) |

---

## Validation Rules
- Title: 3–100 characters
- Either video OR PDF must be provided (at least one)
- Subject + Grade + Language all required before saving
- File types enforced client-side and server-side

---

## Edit Mode
- All fields pre-populated from `GET /api/lessons/:id`
- "Save Changes" button replaces "Save as Draft"
- If already published: shows warning "This will update a live lesson"

---

## Auto-Save (Draft)
- While editing, every 60 seconds: auto-save draft to localStorage
- Shows "Draft auto-saved at 2:34 PM"
- On page reload: "Restore unsaved draft?" prompt
