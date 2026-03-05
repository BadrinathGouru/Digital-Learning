# 34 — Phase 1: MVP (Months 1–2)

**Goal:** Working auth, basic dashboards, lessons viewable, quizzes submittable

---

## Deliverables

### Week 1–2: Project Setup
- [ ] Initialize `/client` with Vite + React + Tailwind + PWA plugin
- [ ] Initialize `/server` with Node + Express + Mongoose
- [ ] Connect MongoDB Atlas
- [ ] Set up environment variables
- [ ] Set up GitHub repository + branch structure (`main`, `dev`, `feature/*`)
- [ ] Deploy skeleton to Vercel (frontend) + Render (backend)

### Week 3–4: Authentication
- [ ] Build `LoginPage.jsx` (role toggle, form, validation)
- [ ] `POST /api/auth/login` endpoint with JWT
- [ ] Firebase phone auth (OTP flow)
- [ ] `AuthContext.jsx` with token storage
- [ ] Protected routes (redirect to login if no token)
- [ ] `RegisterPage.jsx` (first-time password set)

### Week 5–6: Student Dashboard + Lessons
- [ ] `StudentHome.jsx` — hero card, stats, today's lessons
- [ ] `StudentLessons.jsx` — list with subject filter
- [ ] `LessonViewer.jsx` — video player + progress tracking
- [ ] `GET /api/lessons` endpoint
- [ ] `POST /api/progress/update` endpoint
- [ ] `LessonCard.jsx` component

### Week 7–8: Teacher Dashboard + Lesson Builder
- [ ] `TeacherOverview.jsx` — student roster, stats
- [ ] `TeacherLessons.jsx` — lesson list
- [ ] `LessonBuilder.jsx` — create/edit form
- [ ] S3 presigned upload endpoint
- [ ] `POST /api/lessons` endpoint
- [ ] `TeacherQuizBuilder.jsx` — basic quiz creation
- [ ] `POST /api/quiz` endpoint

### Week 8: Basic Quizzes
- [ ] `StudentQuizzes.jsx` — quiz list
- [ ] `QuizRunner.jsx` — MCQ + true/false
- [ ] `QuizResult.jsx` — score display
- [ ] `POST /api/quiz/submit` endpoint (online only)
- [ ] Badge award logic

---

## Phase 1 Test Criteria
- Student can log in, view lessons, track progress
- Teacher can create and publish a lesson
- Teacher can create a quiz linked to a lesson
- Student can take a quiz and see results
- All routes protected by role

---

# 35 — Phase 2: Real-Time + Offline (Month 3)

**Goal:** Socket.IO live features + full offline support

---

## Deliverables

### Week 9–10: Socket.IO Integration
- [ ] Set up Socket.IO server with auth middleware
- [ ] `StudentChat.jsx` — live chat with Socket.IO
- [ ] `TeacherChat.jsx` — with mute/delete controls
- [ ] Presence tracking (online count, roster dots)
- [ ] Teacher "Start/End Class" flow
- [ ] Live quiz launch via Socket.IO

### Week 11–12: Offline Support
- [ ] IndexedDB setup (`idb.js`)
- [ ] `syncQueue.js` — enqueue/flush
- [ ] `useOffline.js` hook
- [ ] Service Worker with Workbox caching strategies
- [ ] "⬇ Save for Offline" button on lessons
- [ ] Offline quiz submission (queue + local score)
- [ ] `POST /api/progress/sync` bulk sync endpoint
- [ ] `OfflineBanner.jsx` component
- [ ] SyncContext + sync status indicator

---

## Phase 2 Test Criteria
- Two devices can chat in real-time in same room
- Teacher can launch live quiz; students see it instantly
- Student can watch lesson with no internet (pre-downloaded)
- Quiz submitted offline successfully syncs on reconnect
- Online/offline indicator accurate

---

# 36 — Phase 3: Analytics + Localization (Month 4)

**Goal:** Charts, multilingual UI, admin panel

---

## Deliverables

### Week 13–14: Analytics
- [ ] `TeacherAnalytics.jsx` — bar chart, student table, donut chart
- [ ] Recharts integration
- [ ] `GET /api/progress/export` CSV endpoint
- [ ] Per-student progress expansion rows
- [ ] `AdminReports.jsx` — school-wide charts

### Week 15–16: Localization
- [ ] i18next setup with EN / PA / HI JSON files
- [ ] Translate all UI strings (buttons, labels, placeholders)
- [ ] Language selector in header + profile
- [ ] Lesson content served in selected language
- [ ] Quiz questions in lesson language

### Week 15–16: Admin Panel
- [ ] `AdminOverview.jsx`
- [ ] `AdminUsers.jsx` — CRUD, bulk CSV upload
- [ ] `AdminContent.jsx` — digital literacy modules
- [ ] Announcement system (create + receive)

---

## Phase 3 Test Criteria
- Teacher can view quiz score bar chart
- Teacher can export student data as CSV
- App renders fully in Punjabi
- Admin can add a new student from CSV
- Announcement appears on student screen within 2 seconds

---

# 37 — Phase 4: Testing & Deployment (Months 5–6)

**Goal:** Device testing, cloud deploy, pilot in Nabha schools

---

## Testing

### Device Testing
- [ ] Test on 4GB RAM Android (Redmi, Samsung budget range)
- [ ] Test on 2G and 3G network throttling (Chrome DevTools)
- [ ] Test offline → reconnect flow
- [ ] Test PWA install ("Add to Home Screen")
- [ ] Lighthouse audit (target: PWA ≥ 90, Performance ≥ 70)

### Functional Testing
- [ ] End-to-end: student login → lesson → quiz → result
- [ ] End-to-end: teacher create lesson → student views it
- [ ] End-to-end: offline lesson → quiz → reconnect → sync
- [ ] Socket.IO: live chat with 10 simulated users
- [ ] Socket.IO: live quiz with class of 30

### Load Testing
- [ ] Simulate 100 students online simultaneously
- [ ] API response time < 500ms under load

---

## Deployment Checklist

### Frontend (Vercel)
- [ ] Set all `VITE_*` env vars in Vercel dashboard
- [ ] Enable PWA manifest headers
- [ ] Set up custom domain (if available)

### Backend (Render / AWS EC2)
- [ ] Set all server env vars
- [ ] Enable HTTPS (Let's Encrypt)
- [ ] Configure CORS to allow Vercel domain only
- [ ] Set up MongoDB Atlas IP whitelist

### Monitoring
- [ ] Set up Render health check endpoint: `GET /api/health`
- [ ] MongoDB Atlas performance alerts
- [ ] Upstash Redis monitor

---

## Pilot Testing (Nabha Schools)
- [ ] Conduct training session for 2 teachers
- [ ] Enroll 30–50 students per school
- [ ] Monitor for 2 weeks
- [ ] Collect feedback (Google Form)
- [ ] Fix critical bugs (hotfix branch)
- [ ] Measure: lessons completed, quizzes attempted, avg score

---

# 38 — Security

## JWT Security
- Secret: 256-bit random string, only in server `.env`
- Access token lifetime: 7 days
- Refresh token stored: localStorage (acceptable for PWA)
- Token rotation on refresh

## Password Security
- bcrypt hash (12 salt rounds)
- Minimum 8 characters enforced client + server
- Temporary passwords auto-generated (8 chars, alphanumeric)

## API Security
- `helmet()` middleware: sets X-Frame-Options, HSTS, CSP headers
- `cors()`: whitelist only client domain
- `express-rate-limit`: 100 req/15min per IP
- All inputs validated with `joi` before processing
- SQL/NoSQL injection protection via Mongoose (no raw query strings)

## Data Security
- HTTPS everywhere in production
- S3 bucket: private, accessed via presigned URLs only
- Firebase Auth tokens verified server-side
- User passwords never returned in any API response

## Role Enforcement
- Every protected route checks `req.user.role`
- Students cannot access teacher or admin routes
- Teachers can only modify their own lessons/quizzes

---

# 39 — Future Expansion

## Phase 5 — AI Tutor
- Personalized lesson recommendations based on quiz performance
- Weak topic detection: "You struggled with fractions — try this lesson"
- Integration: Anthropic API or open-source model (Ollama on-device)

## Phase 6 — Speech Features
- Text-to-speech: lesson notes read aloud in Punjabi/Hindi
- Speech-to-text: students answer fill-in-blank by speaking
- Accessibility for students with reading difficulties

## Phase 7 — P2P Mesh (Local Classroom)
- WebRTC DataChannels for device-to-device sync
- Teacher's device acts as local micro-server
- Students sync with teacher's device without internet
- Progress queued locally, teacher device syncs to cloud nightly
- See `33_P2P_MESH.md` for full spec

## Phase 8 — Gamification
- Leaderboards (class, school, district)
- Level system: Bronze → Silver → Gold → Platinum student
- Daily streak bonuses
- Team quizzes (class split into teams)

## Phase 9 — Government Integration
- API integration with DIKSHA (national digital education platform)
- Import NCERT curriculum-aligned content
- Export progress reports to state education board format

## Phase 10 — Parent Portal
- SMS/WhatsApp weekly progress reports to parents
- Simple parent login to view child's progress
- Multilingual SMS in Punjabi
