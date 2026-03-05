# 11 — Student Quizzes

---

## Quizzes List Page
**File:** `/src/pages/student/StudentQuizzes.jsx`
**Route:** `/student/quizzes`

### Layout

#### Header
- Title: "Quizzes"
- Filter: "Pending" / "Completed" toggle pills

#### Quiz Cards (list)
Each card shows:

| Element | Details |
|---------|---------|
| Quiz title | White, semibold |
| Subject label | Colored tag |
| Status badge | "New" (indigo) or "Completed" (emerald) |
| Score ring | If completed: circular progress showing score/total |
| Score percentage | Colored: green ≥80%, amber ≥60%, red <60% |
| Progress bar | Width = score% |

#### Button States
| State | Button | Action |
|-------|--------|--------|
| Not attempted | "Start Quiz →" (indigo, full width) | Navigate to QuizRunner |
| Completed (passed) | "Review Answers" (slate) | Navigate to QuizResult in review mode |
| Completed (failed) | "Try Again" (amber) | Navigate to QuizRunner (new attempt) |

---

## Quiz Runner Page
**File:** `/src/pages/student/QuizRunner.jsx`
**Route:** `/student/quiz/:quizId`

### Header
- Back arrow (warns: "Leaving will lose progress")
- Quiz title
- Progress indicator: "Question 3 of 10"
- Timer (if `timeLimit > 0`): countdown in top right, red when < 30s

### Question Display

#### MCQ Question
- Question text (large, white, supports Punjabi/Hindi)
- 4 option buttons (A, B, C, D)
- **Unselected:** `bg-slate-800 border border-white/10`
- **Selected:** `bg-indigo-600 border-indigo-500 text-white`
- Only one selectable at a time

#### True/False Question
- Two large buttons: "✅ True" and "❌ False"
- Same selected/unselected states

#### Fill in the Blank
- Text input field
- Accepts Punjabi/Hindi/English based on lesson language

### Navigation Bar (bottom)
- "← Previous" button (disabled on Q1)
- Question dot indicators (tappable to jump)
- "Next →" button
- On last question: "Next" becomes "Submit Quiz"

### Submit Confirmation Modal
- Text: "Submit your quiz? You have answered X/Y questions."
- Unanswered count warning (if any)
- Buttons: "Review" | "Submit Now"

### Timer Expiry
- Auto-submits with current answers
- Toast: "Time's up! Submitting your answers..."

---

## Quiz Submission Flow

### Online
1. Collect `answers: [{ questionId, answer }]`
2. `POST /api/quiz/submit` with `{ quizId, studentId, answers, timeTaken }`
3. Backend scores: compares each answer to `correctAnswer`
4. Returns `{ score, totalPoints, passed, badgeAwarded, explanations }`
5. Navigate to QuizResult page

### Offline
1. Save to IndexedDB `syncQueue`: full submission payload
2. Score locally (quiz questions already cached with correct answers for offline quiz)
3. Show local result with note: "Results synced when you reconnect"
4. Badge shown immediately (from local quiz data)

---

## Quiz Result Page
**File:** `/src/pages/student/QuizResult.jsx`
**Route:** `/student/quiz/:quizId/result`

### Layout

#### Score Hero
- Large circular progress ring (64px)
- Score: "8/10" centered inside ring
- Percentage below: "80%"
- Color: green (≥80%), amber (≥60%), red (<60%)
- Passed/Failed label

#### Badge Award (if passed and first time)
- Animated badge appear: 🏅 badge emoji
- Text: "You earned the [Badge Name] badge!"
- Confetti animation (CSS keyframes, lightweight)

#### Points Awarded
- "+8 points added to your total"

#### Answer Review (expandable)
- Each question listed:
  - Question text
  - Your answer (green ✓ or red ✗)
  - Correct answer (shown always)
  - Explanation (from quiz data)

#### Bottom Buttons
- "Back to Lessons" → `/student/lessons`
- "Try Again" → QuizRunner (only if not passed or teacher allows retakes)
- "Share Result" → native share API (`navigator.share`)

---

## Badge System
| Badge | Trigger |
|-------|---------|
| ⭐ First Star | Complete first quiz |
| 🏅 Scholar | Score 80%+ on any quiz |
| 🔥 On Fire | 3 quizzes in a row above 70% |
| 💡 Quick Learner | Complete a lesson + quiz same day |
| 🌟 Perfect | Score 100% on any quiz |

Badges stored in `user.badges` array, displayed on Student Home.
