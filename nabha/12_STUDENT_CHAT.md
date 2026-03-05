# 12 — Student Live Chat

**File:** `/src/pages/student/StudentChat.jsx`
**Route:** `/student/chat`

---

## Overview
Real-time classroom chat between students and teachers using Socket.IO.
Falls back to local queue when offline (messages sent on reconnect).

---

## Screen Layout

### Header
- Teacher avatar (initial in colored circle)
- Teacher name + subject
- Live indicator: "🟢 Live Class" (emerald) or "⚫ Class Ended"
- Participant count: "👥 24 online"

### Message Area (scrollable, flex-col)
- Grows to fill screen between header and input
- Auto-scrolls to bottom on new message
- Load earlier messages: "Load earlier messages ↑" button at top

#### Message Bubble — Teacher
- Left-aligned
- Purple circle avatar with initial
- Sender name + timestamp (10px, slate-500)
- Bubble: `bg-slate-700 text-slate-100 rounded-2xl rounded-tl-sm`

#### Message Bubble — Current Student (own)
- Right-aligned
- Indigo bubble: `bg-indigo-600 text-white rounded-2xl rounded-tr-sm`
- No avatar shown (it's you)

#### Message Bubble — Other Student
- Left-aligned
- Slate avatar
- Same bubble style as teacher but different avatar color

#### Special Message Types

**Announcement message:**
- Full-width card with amber accent
- 📢 icon + announcement text
- Posted by teacher, visible to all

**Quiz result message:**
- Auto-posted when teacher triggers live quiz
- Shows: "Quiz ended — Class average: 76%"

**Typing indicator:**
- Appears at bottom of message area
- "Mrs. Priya is typing..." with animated dots
- Disappears after 3 seconds of no keystroke

---

## Input Area (fixed bottom)
- Text input: `placeholder="Type a message..."`
- Focus: `border-indigo-500`
- On typing: emit `typing` socket event (throttled every 1s)
- Send button: ➤ (indigo circle)
- Send on: button click OR Enter key

### Send Logic
1. If online: emit `chat:send` socket event immediately
2. If offline: save to IndexedDB `messages` store with `deliveredOffline: true`
   - Show with amber dot "⏳ Pending"
   - On reconnect: flush queue, message gets posted with original timestamp

---

## Socket.IO Events (Client Side)

| Event | Direction | Payload | Action |
|-------|-----------|---------|--------|
| `chat:join` | Emit on mount | `{ roomId, userId }` | Join classroom room |
| `chat:send` | Emit on send | `{ roomId, text, senderId }` | Send message |
| `chat:message` | Listen | `{ message object }` | Append to message list |
| `chat:typing` | Emit on keypress | `{ roomId, userId, name }` | Notify teacher/class |
| `chat:typing_indicator` | Listen | `{ name }` | Show "X is typing..." |
| `chat:stop_typing` | Emit on blur/pause | `{ roomId, userId }` | Clear indicator |
| `presence:online` | Listen | `{ userId, name }` | Update online count |
| `presence:offline` | Listen | `{ userId }` | Update online count |
| `chat:leave` | Emit on unmount | `{ roomId, userId }` | Leave room |

---

## Room ID Format
`class_{grade}_{schoolCode}` e.g. `class_7A_NAB`

---

## Message History (REST fallback)
- On mount, `GET /api/chat/history?roomId={roomId}&limit=50`
- Loads last 50 messages before Socket.IO takes over
- Merged with live Socket.IO stream

---

## Offline Behavior
| Scenario | Behavior |
|----------|---------|
| Offline, opens chat | Shows last 50 messages from IndexedDB |
| Types a message offline | Queued locally, amber "⏳" indicator |
| Reconnects | Flushes queued messages, "✓ Delivered" indicator |
| Teacher starts class offline | Join event queued, joins when online |

---

## Accessibility
- All messages have `aria-label` with sender + time
- Input has `aria-label="Type a message"`
- Send button has `aria-label="Send message"`
