# 07 — Auth Screens (UI Spec)

---

## Login Page (`/pages/LoginPage.jsx`)

### Layout
- Full-screen dark background (`bg-slate-950`)
- Centered card, max-width 384px
- Vertically centered with flex

### Elements (top to bottom)

#### 1. App Logo Block
- Icon: 🎓 emoji in `w-16 h-16 bg-indigo-600 rounded-2xl`
- Title: "Vidya Setu" — bold, white, 24px
- Subtitle: "Digital Learning · Nabha Rural Schools" — slate-400, 14px

#### 2. Role Toggle (Student / Teacher)
- Container: `bg-slate-800 rounded-2xl p-1 flex`
- Two buttons side by side
- **Active state:** `bg-indigo-600 text-white rounded-xl shadow`
- **Inactive state:** `text-slate-400`
- Labels: "🧑‍🎓 Student" and "👩‍🏫 Teacher"
- On click: switches role → changes placeholder text below

#### 3. School ID / Phone Field
- Placeholder (Student): "School ID or Phone Number"
- Placeholder (Teacher): "Teacher ID or Email"
- Style: `bg-slate-800 border border-white/10 rounded-xl px-4 py-3.5 text-white`
- Focus: `border-indigo-500`
- Input type: `text` (allows both letters and numbers)

#### 4. Password Field
- Type: `password`
- Placeholder: "Password"
- Same style as above
- Right side: 👁 toggle button to show/hide password

#### 5. Forgot Password Link
- Text: "Forgot password?"
- Align right
- Color: `text-indigo-400`
- On click: navigates to `/forgot-password`

#### 6. Sign In Button
- Full width
- Text: "Sign In →"
- Style: `bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold`
- Loading state: spinner replaces arrow, button disabled
- On success: navigate to role-specific dashboard

#### 7. OTP Login Option (Students only)
- Shown only when role = "student"
- Text: "Or login with OTP →"
- On click: shows Phone OTP flow (see below)

#### 8. Language Footer
- Text: "Supports English · ਪੰਜਾਬੀ · हिंदी"
- Color: `text-slate-500`, 12px, centered

#### 9. Institution Footer
- Text: "SIH2025 · Matrusri Engineering College"
- Color: `text-slate-600`, 10px, centered

---

## OTP Login Sub-flow (Modal or Page)

### Step 1 — Enter Phone
- Input: Phone number with +91 prefix
- Button: "Send OTP"
- On click: calls `firebase.auth().signInWithPhoneNumber()`

### Step 2 — Enter OTP
- 6 individual digit inputs (auto-advance on type)
- Timer: "Resend in 45s" countdown
- Button: "Verify OTP"
- On success: calls backend, gets JWT

---

## Register Page (`/pages/RegisterPage.jsx`)
*Note: Students are pre-registered by admin. This page is for first-time password setup.*

### Elements
1. Header: "Set Your Password"
2. Display: School ID (read-only, pre-filled)
3. Input: New Password
4. Input: Confirm Password
5. Password strength indicator (weak / medium / strong)
6. Button: "Set Password & Continue →"
7. On success: redirect to student home

---

## Forgot Password Page
1. Input: School ID or Phone
2. Button: "Send Reset Link / OTP"
3. If phone → OTP flow
4. If email → email link (teachers)
5. Success message shown inline

---

## Error States
| Error | Where Shown | Message |
|-------|------------|---------|
| Wrong credentials | Below sign in button | "Incorrect ID or password. Try again." |
| Account locked | Below sign in button | "Too many attempts. Try in 15 minutes." |
| Network offline | Top banner | "You're offline. Check your connection." |
| Invalid OTP | OTP field | "Invalid code. Please try again." |
| OTP expired | OTP field | "Code expired. Tap Resend." |
