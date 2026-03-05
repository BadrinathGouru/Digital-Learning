# 18 — Teacher Chat

**File:** `/src/pages/teacher/TeacherChat.jsx`
**Route:** `/teacher/chat`

---

## Overview
Same chat interface as students but with elevated controls.
Teacher can see all messages, pin messages, and remove inappropriate content.

---

## Screen Layout

### Header
- Class name: "Class 7A — Science"
- Student count: "👥 24/38 online"
- **Controls (right side):**
  - 📌 Pin mode toggle
  - 🚫 Mute all students toggle
  - 📢 Announcement button

---

## Teacher-Only Controls

### Mute All Students
- Toggle in header
- When ON: students cannot send messages (receive only)
- Socket event emitted: `chat:muteAll { roomId, muted: true }`
- Students see: "Chat is paused by teacher"

### Delete Message (per message)
- Long-press or swipe on any message → "Delete" button appears
- On tap: `DELETE /api/messages/:id` + emit `chat:deleteMessage { messageId }`
- Message replaced with "Message removed by teacher" for all users

### Pin Message
- Long-press → "Pin" button
- Pinned message shown at top of chat in amber banner
- Only one pinned message at a time

### Reply to Specific Student
- Tap message → "Reply" button
- Input pre-fills "@StudentName"
- Reply shown threaded under original message

---

## Message Input (Teacher)
- Same as student input
- Additional: attachment button 📎
  - Allows sending image or PDF link
  - Calls presigned upload, inserts link in message

---

# 19 — Teacher Announcements

**File:** `/src/pages/teacher/TeacherAnnouncements.jsx`
**Route:** `/teacher/announcements`

---

## Announcements List

### Header
- Title: "Announcements"
- "+ New Announcement" button

### Announcement Cards (list)
Each card:
| Element | Details |
|---------|---------|
| Title | Bold, white |
| Body preview | First 100 chars, slate-400 |
| Target | "Class 7A" or "All Classes" |
| Language | EN / PA / HI badge |
| Read count | "12/38 students read" |
| Date | Relative time |
| Edit / Delete buttons | Teacher-only |

---

## Announcement Composer (Modal)

### Fields
| Field | Type | Notes |
|-------|------|-------|
| Title | Text input | 5–100 chars |
| Body | Textarea | 10–1000 chars, supports Punjabi/Hindi |
| Target Grade | Dropdown | 7A / 8A / All |
| Language | Dropdown | EN / PA / HI |
| Schedule | Date-time picker | Optional: schedule for later |

### Buttons
- "Send Now" → `POST /api/announcements` + emit `announcement:new` via Socket.IO
- "Schedule" → saves with `scheduledAt` timestamp, cron job sends it
- "Cancel" → close modal

---

## How Students Receive Announcements
1. If online: `announcement:new` socket event → toast notification appears
2. If offline: picked up on next app open from `GET /api/announcements?unread=true`
3. Unread count shown on chat tab badge
4. In Student Chat: announcement shows as special full-width amber card
