# 04 — Database Schemas (Mongoose)

---

## 1. User Schema (`/server/models/User.js`)
```js
{
  _id: ObjectId,
  name: String,                        // Full name
  role: "student" | "teacher" | "admin",
  schoolId: String,                    // e.g. "NAB-042"
  phone: String,                       // For Firebase phone auth
  email: String,                       // Optional for teachers/admins
  language: "English" | "Punjabi" | "Hindi",  // UI language preference
  firebaseUid: String,                 // Links to Firebase Auth record
  grade: String,                       // Students only (e.g. "7A")
  subject: String,                     // Teachers only (e.g. "Science")
  schoolRef: ObjectId,                 // ref: 'School'
  progress: [
    {
      lessonId: ObjectId,              // ref: 'Lesson'
      status: "not_started" | "in_progress" | "completed",
      score: Number,                   // Last quiz score for this lesson (0–100)
      lastAccessed: Date,
      completedAt: Date
    }
  ],
  badges: [String],                    // e.g. ["star", "fire", "perfect"]
  totalPoints: Number,                 // Gamification points
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 2. School Schema (`/server/models/School.js`)
```js
{
  _id: ObjectId,
  name: String,                        // e.g. "Govt. Senior Secondary School, Nabha"
  code: String,                        // e.g. "NAB"
  address: String,
  district: String,                    // "Patiala"
  state: String,                       // "Punjab"
  contactPhone: String,
  adminRef: ObjectId,                  // ref: 'User' (admin role)
  totalStudents: Number,
  totalTeachers: Number,
  createdAt: Date
}
```

---

## 3. Lesson Schema (`/server/models/Lesson.js`)
```js
{
  _id: ObjectId,
  title: String,                       // e.g. "ਗਣਿਤ: ਭਿੰਨਾਂ"
  subject: String,                     // "Mathematics" | "Science" | etc.
  grade: String,                       // "7" | "8" | etc.
  language: "English" | "Punjabi" | "Hindi",
  description: String,
  contentUrl: String,                  // S3/Firebase URL for video
  pdfUrl: String,                      // S3/Firebase URL for PDF notes
  thumbnailUrl: String,
  duration: Number,                    // Minutes
  quizId: ObjectId,                    // ref: 'Quiz'
  tags: [String],
  isPublished: Boolean,
  isDownloadable: Boolean,             // Can students cache offline
  schoolRef: ObjectId,                 // ref: 'School' (null = global)
  createdBy: ObjectId,                 // ref: 'User' (teacher)
  createdAt: Date,
  updatedAt: Date
}
```

---

## 4. Quiz Schema (`/server/models/Quiz.js`)
```js
{
  _id: ObjectId,
  title: String,
  lessonId: ObjectId,                  // ref: 'Lesson'
  subject: String,
  grade: String,
  language: "English" | "Punjabi" | "Hindi",
  questions: [
    {
      _id: ObjectId,
      questionText: String,
      type: "mcq" | "true_false" | "fill_blank",
      options: [String],               // For MCQ: ["A","B","C","D"]
      correctAnswer: String,           // Index for MCQ, string for others
      points: Number,                  // Default 1
      explanation: String              // Shown after answering
    }
  ],
  totalPoints: Number,
  timeLimit: Number,                   // Seconds (0 = no limit)
  passingScore: Number,                // Percentage (e.g. 60)
  badgeAwarded: String,               // Badge name if passed
  createdBy: ObjectId,                 // ref: 'User'
  createdAt: Date
}
```

---

## 5. Progress Schema (`/server/models/Progress.js`)
```js
{
  _id: ObjectId,
  studentId: ObjectId,                 // ref: 'User'
  lessonId: ObjectId,                  // ref: 'Lesson'
  quizId: ObjectId,                    // ref: 'Quiz'
  schoolId: ObjectId,                  // ref: 'School'
  lessonStatus: "not_started" | "in_progress" | "completed",
  lessonProgressPct: Number,           // 0–100, video watch percentage
  quizAttempts: [
    {
      attemptedAt: Date,
      answers: [{ questionId: ObjectId, answer: String }],
      score: Number,
      passed: Boolean,
      timeTaken: Number                // Seconds
    }
  ],
  bestScore: Number,
  syncedAt: Date,                      // Last time synced to cloud
  createdOffline: Boolean,             // Was this record created while offline
  createdAt: Date,
  updatedAt: Date
}
```

---

## 6. Message Schema (`/server/models/Message.js`)
```js
{
  _id: ObjectId,
  roomId: String,                      // e.g. "class_7A_school_NAB"
  senderId: ObjectId,                  // ref: 'User'
  senderName: String,                  // Denormalized for display speed
  senderRole: "student" | "teacher",
  text: String,
  type: "text" | "announcement" | "quiz_result",
  metadata: Object,                    // Optional: quiz score, file link, etc.
  timestamp: Date,
  deliveredOffline: Boolean            // Was sender offline when sent
}
```

---

## 7. Announcement Schema (`/server/models/Announcement.js`)
```js
{
  _id: ObjectId,
  title: String,
  body: String,
  teacherId: ObjectId,                 // ref: 'User'
  schoolId: ObjectId,                  // ref: 'School'
  targetGrade: String,                 // "7A" | "all"
  language: "English" | "Punjabi" | "Hindi",
  isRead: [ObjectId],                  // Array of studentIds who read it
  createdAt: Date
}
```

---

## IndexedDB Stores (Client-side)
| Store Name | Key | What It Holds |
|-----------|-----|--------------|
| `lessons` | lessonId | Full lesson JSON + contentUrl for offline |
| `progress` | `studentId_lessonId` | Local progress, synced flag |
| `syncQueue` | auto-increment | Pending API calls to replay when online |
| `messages` | messageId | Recent chat messages per room |
| `user` | `current` | Logged-in user profile (no sensitive data) |
