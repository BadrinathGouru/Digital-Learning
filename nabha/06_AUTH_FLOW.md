# 06 — Authentication Flow

---

## Two Login Methods

### Method A: Phone Number (Firebase Auth)
Used by: Students who don't have an email
1. User enters phone number → Firebase sends OTP SMS
2. User enters OTP → Firebase returns `idToken`
3. Frontend sends `idToken` to backend: `POST /api/auth/firebase-login`
4. Backend verifies with Firebase Admin SDK → finds/creates User in MongoDB
5. Backend returns `{ accessToken, refreshToken, user }`
6. Frontend stores tokens in memory (accessToken) and localStorage (refreshToken)

### Method B: School ID + Password (JWT)
Used by: Students with school IDs, Teachers, Admins
1. User enters `schoolId` + `password`
2. Frontend sends: `POST /api/auth/login`
3. Backend checks User collection, bcrypt compares password
4. Backend returns `{ accessToken, refreshToken, user }`
5. Frontend stores as above

---

## Token Strategy
| Token | Storage | Lifetime | Use |
|-------|---------|---------|-----|
| `accessToken` (JWT) | React state (memory) | 7 days | Every API request header |
| `refreshToken` (JWT) | localStorage | 30 days | Silently get new accessToken |

**Why not cookies?** PWA on Android needs JS-accessible tokens for offline requests.

---

## JWT Payload Structure
```json
{
  "userId": "64abc...",
  "role": "student",
  "schoolId": "NAB",
  "iat": 1700000000,
  "exp": 1700604800
}
```

---

## Auth Middleware Flow (Backend)
```
Request → auth.middleware.js
  → Extract Bearer token from Authorization header
  → jwt.verify(token, JWT_SECRET)
  → Attach req.user = { userId, role, schoolId }
  → Next()
  OR → 401 Unauthorized
```

---

## Role-Based Access Control
| Route | Student | Teacher | Admin |
|-------|---------|---------|-------|
| GET /lessons | ✅ | ✅ | ✅ |
| POST /lessons | ❌ | ✅ | ✅ |
| DELETE /lessons | ❌ | Own only | ✅ |
| GET /analytics | ❌ | Own class | ✅ |
| GET /admin/* | ❌ | ❌ | ✅ |
| POST /users | ❌ | ❌ | ✅ |

---

## Refresh Token Flow
1. Axios interceptor catches 401 response
2. Calls `POST /api/auth/refresh` with refreshToken
3. Gets new accessToken
4. Retries original request
5. If refresh also fails → logout, redirect to login

---

## Registration Flow (Student)
1. Admin creates student account (or teacher invites)
2. Student receives School ID + temporary password
3. Student logs in with School ID + temp password
4. Forced to change password on first login
5. Optional: Link phone number for OTP login

## Registration Flow (Teacher)
1. Admin creates teacher account via Admin Panel
2. Teacher receives email with login credentials
3. Teacher logs in, sets new password

---

## Offline Auth
- If `accessToken` is present in memory and not expired → allow access to cached content
- If expired while offline → show soft warning, still allow offline lesson access
- Progress tracked locally in IndexedDB regardless of auth state
- On reconnect → re-authenticate silently using refreshToken

---

## Security Notes
- Passwords hashed with bcrypt (salt rounds: 12)
- JWT secret stored only in server env
- All routes behind HTTPS in production
- Rate limit: 5 login attempts per 15 minutes per IP
