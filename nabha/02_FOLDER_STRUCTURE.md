# 02 — Folder Structure

---

## Frontend (`/client`)
```
client/
├── public/
│   ├── manifest.json          # PWA manifest (name, icons, theme color)
│   ├── sw.js                  # Service Worker entry point
│   └── icons/                 # PWA icons (192x192, 512x512)
├── src/
│   ├── index.jsx              # React entry, registers SW
│   ├── App.jsx                # Root router, auth gate
│   │
│   ├── components/            # Shared/reusable UI components
│   │   ├── BottomNav.jsx      # Tab bar navigation
│   │   ├── StatusBar.jsx      # Online/offline indicator + language picker
│   │   ├── ProgressRing.jsx   # Circular progress SVG
│   │   ├── LessonCard.jsx     # Lesson tile with offline badge
│   │   ├── QuizCard.jsx       # Quiz tile with score ring
│   │   ├── ChatBubble.jsx     # Individual message bubble
│   │   ├── BadgeDisplay.jsx   # Emoji badge row
│   │   ├── SubjectTag.jsx     # Colored subject label
│   │   ├── OfflineBanner.jsx  # Yellow banner shown when offline
│   │   └── LoadingSpinner.jsx # Lightweight spinner (no heavy lib)
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx      # Login + role toggle
│   │   ├── RegisterPage.jsx   # Student/teacher registration
│   │   │
│   │   ├── student/
│   │   │   ├── StudentHome.jsx
│   │   │   ├── StudentLessons.jsx
│   │   │   ├── LessonViewer.jsx
│   │   │   ├── StudentQuizzes.jsx
│   │   │   ├── QuizRunner.jsx
│   │   │   ├── QuizResult.jsx
│   │   │   ├── StudentChat.jsx
│   │   │   └── StudentProfile.jsx
│   │   │
│   │   ├── teacher/
│   │   │   ├── TeacherOverview.jsx
│   │   │   ├── TeacherLessons.jsx
│   │   │   ├── LessonBuilder.jsx
│   │   │   ├── TeacherQuizBuilder.jsx
│   │   │   ├── TeacherAnalytics.jsx
│   │   │   ├── TeacherChat.jsx
│   │   │   └── TeacherAnnouncements.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminOverview.jsx
│   │       ├── AdminUsers.jsx
│   │       ├── AdminContent.jsx
│   │       └── AdminReports.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx    # User session, role, JWT
│   │   ├── LangContext.jsx    # Active language (en/pa/hi)
│   │   ├── SocketContext.jsx  # Socket.IO instance
│   │   └── SyncContext.jsx    # Online status, sync queue state
│   │
│   ├── hooks/
│   │   ├── useAuth.js         # Auth helpers
│   │   ├── useSocket.js       # Socket.IO event binding
│   │   ├── useOffline.js      # navigator.onLine + event listeners
│   │   ├── useIndexedDB.js    # Read/write IndexedDB
│   │   └── useSyncQueue.js    # Enqueue offline actions, flush on reconnect
│   │
│   ├── services/
│   │   ├── api.js             # Axios instance with JWT interceptor
│   │   ├── authService.js     # Login, register, refresh token
│   │   ├── lessonService.js   # Fetch, cache, download lessons
│   │   ├── quizService.js     # Fetch quiz, submit answers
│   │   ├── progressService.js # Save/read progress (online + IDB)
│   │   ├── chatService.js     # REST chat history fetch
│   │   └── syncService.js     # Flush offline queue to server
│   │
│   ├── offline/
│   │   ├── idb.js             # IndexedDB setup (stores: lessons, progress, queue)
│   │   ├── syncQueue.js       # Add/read/clear sync queue
│   │   └── cacheManager.js    # Manage cached lesson assets
│   │
│   ├── i18n/
│   │   ├── en.json            # English strings
│   │   ├── pa.json            # Punjabi strings
│   │   └── hi.json            # Hindi strings
│   │
│   └── utils/
│       ├── formatters.js      # Date, score, duration formatters
│       ├── validators.js      # Form validation helpers
│       └── constants.js       # App-wide constants (routes, stores)
```

---

## Backend (`/server`)
```
server/
├── index.js                   # Entry: Express + Socket.IO init
├── app.js                     # Express app, middleware, routes
│
├── config/
│   ├── db.js                  # MongoDB Atlas connection
│   ├── firebase.js            # Firebase Admin SDK init
│   └── constants.js           # JWT secret, port, env vars
│
├── models/
│   ├── User.js                # User schema
│   ├── Lesson.js              # Lesson schema
│   ├── Quiz.js                # Quiz schema
│   ├── Question.js            # Question schema
│   ├── Progress.js            # Progress schema
│   ├── Message.js             # Chat message schema
│   ├── Announcement.js        # Broadcast announcement schema
│   └── School.js              # School schema
│
├── routes/
│   ├── auth.routes.js
│   ├── lesson.routes.js
│   ├── quiz.routes.js
│   ├── progress.routes.js
│   ├── chat.routes.js
│   ├── user.routes.js
│   └── admin.routes.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── lesson.controller.js
│   ├── quiz.controller.js
│   ├── progress.controller.js
│   ├── chat.controller.js
│   ├── user.controller.js
│   └── admin.controller.js
│
├── middleware/
│   ├── auth.middleware.js     # Verify JWT, attach req.user
│   ├── role.middleware.js     # requireRole('teacher') etc.
│   ├── rateLimit.middleware.js
│   └── compress.middleware.js # Compression for low bandwidth
│
├── sockets/
│   ├── index.js               # Socket.IO server init
│   ├── chat.socket.js         # Chat events
│   ├── quiz.socket.js         # Live quiz events
│   ├── presence.socket.js     # Online/offline tracking
│   └── sync.socket.js         # Offline data sync handshake
│
└── utils/
    ├── jwt.js                 # Sign/verify tokens
    ├── cloudStorage.js        # AWS S3 / Firebase Storage helpers
    └── validators.js          # Input sanitization
```

---

## Root
```
vidya-setu/
├── client/                    # React PWA (above)
├── server/                    # Node/Express (above)
├── .gitignore
├── README.md
└── docker-compose.yml         # Optional: local dev setup
```
