# 24–29 — Backend API Reference

---

# 24 — Auth API (`/api/auth`)

| Method | Endpoint | Auth | Body | Response |
|--------|----------|------|------|----------|
| POST | `/login` | None | `{ schoolId, password }` | `{ accessToken, refreshToken, user }` |
| POST | `/firebase-login` | None | `{ idToken }` | `{ accessToken, refreshToken, user }` |
| POST | `/refresh` | None | `{ refreshToken }` | `{ accessToken }` |
| POST | `/logout` | JWT | — | `{ message: "ok" }` |
| POST | `/change-password` | JWT | `{ currentPassword, newPassword }` | `{ message }` |
| POST | `/forgot-password` | None | `{ schoolId }` | `{ message }` |
| POST | `/reset-password` | None | `{ token, newPassword }` | `{ message }` |

---

# 25 — Lessons API (`/api/lessons`)

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/lessons` | JWT | Query: `grade`, `subject`, `language`, `createdBy` |
| GET | `/lessons/:id` | JWT | Single lesson |
| POST | `/lessons` | Teacher/Admin | Create lesson |
| PUT | `/lessons/:id` | Teacher (own) / Admin | Update lesson |
| PATCH | `/lessons/:id` | Teacher (own) | Partial update (e.g. toggle publish) |
| DELETE | `/lessons/:id` | Teacher (own) / Admin | Delete lesson |
| GET | `/lessons/:id/download` | JWT | Returns blob-ready response for offline |

### POST/PUT `/lessons` Body
```json
{
  "title": "string",
  "subject": "string",
  "grade": "string",
  "language": "string",
  "description": "string",
  "contentUrl": "string",
  "pdfUrl": "string",
  "thumbnailUrl": "string",
  "duration": 18,
  "quizId": "ObjectId or null",
  "isPublished": false,
  "isDownloadable": true
}
```

---

# 26 — Quiz API (`/api/quiz`)

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/quiz` | JWT | Query: `lessonId`, `grade` |
| GET | `/quiz/:id` | JWT | Single quiz (includes questions) |
| POST | `/quiz` | Teacher/Admin | Create quiz |
| PUT | `/quiz/:id` | Teacher (own) | Update quiz |
| DELETE | `/quiz/:id` | Teacher (own) / Admin | Delete quiz |
| POST | `/quiz/submit` | Student | Submit answers |
| GET | `/quiz/results` | Teacher/Admin | Query: `quizId`, `grade` |

### POST `/quiz/submit` Body
```json
{
  "quizId": "ObjectId",
  "studentId": "ObjectId",
  "answers": [
    { "questionId": "ObjectId", "answer": "A" }
  ],
  "timeTaken": 120
}
```

### POST `/quiz/submit` Response
```json
{
  "score": 8,
  "totalPoints": 10,
  "percentage": 80,
  "passed": true,
  "badgeAwarded": "scholar",
  "explanations": [
    { "questionId": "...", "correct": true, "explanation": "..." }
  ]
}
```

---

# 27 — Progress API (`/api/progress`)

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/progress` | Teacher/Admin | Query: `studentId`, `grade`, `schoolId` |
| GET | `/progress/:studentId` | JWT (own or teacher) | All progress for one student |
| POST | `/progress/update` | Student | Save lesson progress |
| POST | `/progress/sync` | Student | Bulk sync from offline queue |
| GET | `/progress/export` | Teacher/Admin | Returns CSV |

### POST `/progress/update` Body
```json
{
  "studentId": "ObjectId",
  "lessonId": "ObjectId",
  "lessonProgressPct": 75,
  "status": "in_progress"
}
```

### POST `/progress/sync` Body (bulk offline flush)
```json
{
  "updates": [
    { "lessonId": "...", "lessonProgressPct": 80, "status": "completed", "recordedAt": "ISO date" },
    { "quizId": "...", "answers": [...], "timeTaken": 90, "recordedAt": "ISO date" }
  ]
}
```

---

# 28 — Chat API (`/api/chat`)

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/chat/history` | JWT | Query: `roomId`, `limit`, `before` (cursor) |
| DELETE | `/chat/messages/:id` | Teacher/Admin | Remove a message |
| GET | `/chat/rooms` | Teacher | List all active rooms |

*Real-time chat handled by Socket.IO (see file 30)*

---

# 29 — Users API (`/api/users`)

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/users` | Teacher/Admin | Query: `role`, `schoolId`, `grade` |
| GET | `/users/:id` | JWT (own or admin) | Single user |
| POST | `/users` | Admin | Create user |
| POST | `/users/bulk` | Admin | Bulk create from CSV |
| PATCH | `/users/:id` | JWT (own) / Admin | Update name, language, etc. |
| DELETE | `/users/:id` | Admin | Soft delete (isActive: false) |
| PATCH | `/users/:id/badges` | System | Add badge |

### Upload API

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/upload/presigned` | Teacher/Admin | Returns S3 presigned URL |
| DELETE | `/upload/:key` | Teacher (own) / Admin | Delete file from S3 |
