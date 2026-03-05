# 03 — Tech Stack

---

## Frontend
| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Framework | React.js | 18.x | Component-based, PWA-friendly |
| Styling | Tailwind CSS | 3.x | Utility-first, tiny bundle, mobile-first |
| PWA | Workbox | 7.x | Service Worker management |
| Offline DB | IndexedDB (idb) | 8.x | Browser-native, stores lessons + queue |
| Real-time | Socket.IO Client | 4.x | Live chat, quiz, presence |
| HTTP client | Axios | 1.x | JWT interceptor, retry logic |
| Router | React Router DOM | 6.x | SPA routing |
| Charts | Recharts | 2.x | Lightweight charts for analytics |
| i18n | i18next | 23.x | EN / Punjabi / Hindi switching |
| Auth | Firebase Auth (client) | 10.x | Phone number / school ID login |
| Media | React Player | 2.x | Lazy-loaded video lessons |

---

## Backend
| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Runtime | Node.js | 20 LTS | Fast, event-driven, JS everywhere |
| Framework | Express.js | 4.x | Minimal, flexible REST API |
| Real-time | Socket.IO | 4.x | WebSocket with fallback |
| Database | MongoDB Atlas | Latest | Flexible schema, cloud-hosted |
| ODM | Mongoose | 8.x | Schema validation + query helpers |
| Cache | Redis (Upstash) | 7.x | Real-time performance, session store |
| Auth | Firebase Admin + JWT | — | Dual auth: phone (Firebase) + school ID (JWT) |
| File Storage | AWS S3 / Firebase Storage | — | Videos, PDFs, images |
| Compression | compression (npm) | 1.x | Gzip all responses for low bandwidth |
| Security | helmet, cors | — | HTTP headers, CORS |
| Rate Limiting | express-rate-limit | — | Prevent abuse on mobile networks |

---

## Offline & Sync
| Technology | Purpose |
|-----------|---------|
| Service Workers (Workbox) | Cache-first for lessons, network-first for API |
| IndexedDB (idb library) | Store lessons, progress, and offline action queue |
| Background Sync API | Flush queued actions when connectivity restores |
| Async data queue | Local-first writes that replay to server |

---

## DevOps & Deployment
| Layer | Technology |
|-------|-----------|
| Frontend Hosting | Vercel |
| Backend Hosting | Render / Railway / AWS EC2 |
| Database | MongoDB Atlas (free tier → M10) |
| Cache | Upstash Redis (serverless) |
| File Storage | AWS S3 or Firebase Storage |
| CI/CD | GitHub Actions |
| Monitoring | Render logs + MongoDB Atlas metrics |

---

## Development Tools
| Tool | Purpose |
|------|---------|
| Vite | Frontend build tool (fast HMR) |
| ESLint + Prettier | Code quality |
| Postman | API testing |
| MongoDB Compass | DB inspection |
| Lighthouse | PWA audit (target score ≥ 90) |

---

## Performance Targets (4GB RAM Android)
- First Contentful Paint: < 2s on 3G
- Bundle size: < 200KB gzipped (initial load)
- Offline load time: < 500ms (from cache)
- Memory usage: < 150MB active
- Lighthouse PWA score: ≥ 90
