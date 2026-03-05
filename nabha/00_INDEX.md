# Vidya Setu — Master Documentation Index
**Digital Learning Platform for Rural School Students in Nabha**
*SIH2025 (SIH25019) · Matrusri Engineering College · Team 3*
*Guide: Mr. Bikshapathy Peruka, Assistant Professor*

---

## How to Use These Files
Each `.md` file is a self-contained implementation spec.
Work through them **in order**, one file at a time.
Each file tells you exactly what to build, what each button does, and what connects where.

---

## File List

### 🏗️ FOUNDATION
| File | What It Covers |
|------|---------------|
| `01_PROJECT_OVERVIEW.md` | Vision, goals, constraints, expected impact |
| `02_FOLDER_STRUCTURE.md` | Full frontend + backend directory tree |
| `03_TECH_STACK.md` | Every library, version, and why it's used |
| `04_DATABASE_SCHEMAS.md` | All Mongoose schemas with field descriptions |
| `05_ENV_AND_CONFIG.md` | Environment variables, package.json for both apps |

### 🔐 AUTHENTICATION FLOW
| File | What It Covers |
|------|---------------|
| `06_AUTH_FLOW.md` | Login, registration, JWT, Firebase Auth, roles |
| `07_AUTH_SCREENS.md` | Every UI element on login/register screens |

### 📱 STUDENT PORTAL
| File | What It Covers |
|------|---------------|
| `08_STUDENT_HOME.md` | Dashboard, welcome card, progress overview, badges |
| `09_STUDENT_LESSONS.md` | Lesson list, filters, lesson viewer, offline download |
| `10_STUDENT_OFFLINE.md` | Service Worker, IndexedDB, sync queue, offline UX |
| `11_STUDENT_QUIZZES.md` | Quiz flow, scoring, results, badges awarded |
| `12_STUDENT_CHAT.md` | Live chat UI, Socket.IO events, offline fallback |
| `13_STUDENT_PROFILE.md` | Profile page, language settings, progress history |

### 👩‍🏫 TEACHER DASHBOARD
| File | What It Covers |
|------|---------------|
| `14_TEACHER_OVERVIEW.md` | Teacher home, live class stats, roster |
| `15_TEACHER_LESSON_BUILDER.md` | Create/edit/publish lessons, upload media |
| `16_TEACHER_QUIZ_BUILDER.md` | Create quizzes, question types, assign to lessons |
| `17_TEACHER_ANALYTICS.md` | Charts, class averages, per-student progress |
| `18_TEACHER_CHAT.md` | Broadcast, live chat, presence indicators |
| `19_TEACHER_ANNOUNCEMENTS.md` | Notification system, push announcements |

### 🛡️ ADMIN PANEL
| File | What It Covers |
|------|---------------|
| `20_ADMIN_OVERVIEW.md` | Admin home, system health, usage metrics |
| `21_ADMIN_USER_MANAGEMENT.md` | Manage students, teachers, enroll/remove |
| `22_ADMIN_CONTENT.md` | Upload digital literacy modules, localization |
| `23_ADMIN_REPORTS.md` | School-wide reports, connectivity logs |

### ⚙️ BACKEND & APIs
| File | What It Covers |
|------|---------------|
| `24_API_AUTH.md` | Auth endpoints, middleware, JWT refresh |
| `25_API_LESSONS.md` | Lesson CRUD endpoints |
| `26_API_QUIZZES.md` | Quiz CRUD, submission, scoring endpoints |
| `27_API_PROGRESS.md` | Progress tracking, sync endpoints |
| `28_API_CHAT.md` | Socket.IO events, REST chat history |
| `29_API_USERS.md` | User CRUD, roles, school management |

### 🔄 REAL-TIME & OFFLINE
| File | What It Covers |
|------|---------------|
| `30_SOCKETIO_EVENTS.md` | Every Socket.IO event, payload, and handler |
| `31_OFFLINE_SYNC_ENGINE.md` | Edge-to-Cloud sync, IndexedDB queues, conflict resolution |
| `32_SERVICE_WORKER.md` | SW registration, caching strategy, background sync |
| `33_P2P_MESH.md` | Local mesh networking (P2P between devices on-premises) |

### 🚀 DEPLOYMENT & PHASES
| File | What It Covers |
|------|---------------|
| `34_PHASE1_MVP.md` | Month 1–2: Auth + basic dashboards |
| `35_PHASE2_REALTIME.md` | Month 3: Socket.IO, offline support |
| `36_PHASE3_ANALYTICS.md` | Month 4: Charts, localization, reports |
| `37_PHASE4_DEPLOY.md` | Month 5–6: Testing on devices, cloud deploy, pilot |
| `38_SECURITY.md` | JWT, HTTPS, role-based access, data compression |
| `39_FUTURE_EXPANSION.md` | AI Tutor, STT/TTS, gamification, govt APIs |

---

*Total: 39 specification files + this index*
