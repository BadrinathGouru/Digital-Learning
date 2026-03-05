# 30 — Socket.IO Events Reference

**File:** `/server/sockets/`

---

## Connection Setup

### Client connects
```js
// Client
const socket = io(VITE_SOCKET_URL, {
  auth: { token: accessToken },
  transports: ['websocket', 'polling']  // Fallback for 2G
});
```

### Server auth middleware
```js
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const user = jwt.verify(token, JWT_SECRET);
  socket.user = user;
  next();
});
```

---

## Namespace: `/chat`

### Events Emitted by Client

| Event | Payload | When |
|-------|---------|------|
| `chat:join` | `{ roomId }` | On chat page mount |
| `chat:send` | `{ roomId, text }` | On send button tap |
| `chat:typing` | `{ roomId }` | On keypress (throttled 1s) |
| `chat:stop_typing` | `{ roomId }` | On input blur or pause |
| `chat:leave` | `{ roomId }` | On page unmount |

### Events Listened by Client

| Event | Payload | Action |
|-------|---------|--------|
| `chat:message` | `{ _id, senderId, senderName, senderRole, text, timestamp }` | Append message to list |
| `chat:typing_indicator` | `{ name }` | Show "X is typing..." |
| `chat:stop_typing_indicator` | `{ name }` | Hide typing indicator |
| `chat:message_deleted` | `{ messageId }` | Remove message from list |
| `chat:muted` | `{ muted: Boolean }` | Lock/unlock input |
| `chat:pinned` | `{ message }` | Show pinned banner |

### Teacher-Only Emits

| Event | Payload | Effect |
|-------|---------|--------|
| `chat:delete_message` | `{ messageId, roomId }` | Removes message for everyone |
| `chat:mute_all` | `{ roomId, muted: Boolean }` | Locks student inputs |
| `chat:pin_message` | `{ roomId, message }` | Pins message at top |

---

## Namespace: `/quiz`

### Events Emitted by Teacher

| Event | Payload | Effect |
|-------|---------|--------|
| `quiz:start` | `{ roomId, quizId, quiz }` | Quiz appears on all student screens |
| `quiz:end` | `{ roomId, quizId }` | Quiz closes for all students |
| `quiz:request_results` | `{ roomId, quizId }` | Triggers results broadcast |

### Events Emitted by Student

| Event | Payload | When |
|-------|---------|------|
| `quiz:answer` | `{ roomId, quizId, questionId, answer }` | Per question answered |
| `quiz:submit` | `{ roomId, quizId, answers, timeTaken }` | On submit tap |

### Events Listened by Client

| Event | Payload | Action (Student) | Action (Teacher) |
|-------|---------|-----------------|-----------------|
| `quiz:started` | `{ quiz }` | Show quiz modal/page | Start timer, track responses |
| `quiz:answer_received` | `{ studentId, questionId }` | — | Increment answer count |
| `quiz:results` | `{ results[] }` | Show personal score | Show class-wide results |
| `quiz:ended` | — | Close quiz | Show summary |

---

## Namespace: `/presence`

### Events Emitted by Client

| Event | Payload | When |
|-------|---------|------|
| `presence:join` | `{ roomId }` | On any page mount |
| `presence:leave` | `{ roomId }` | On page unmount / disconnect |

### Events Listened by Client

| Event | Payload | Action |
|-------|---------|--------|
| `presence:online_count` | `{ roomId, count, users[] }` | Update "X online" indicator |
| `presence:user_joined` | `{ userId, name, role }` | Add to roster |
| `presence:user_left` | `{ userId }` | Update roster dot to offline |

---

## Namespace: `/class`

### Events Emitted by Teacher

| Event | Payload | Effect |
|-------|---------|--------|
| `class:start` | `{ roomId }` | Opens live class, notifies students |
| `class:end` | `{ roomId }` | Ends class, disconnects room |
| `class:announce` | `{ roomId, title, body }` | Broadcasts announcement |

### Events Listened by Client

| Event | Payload | Action |
|-------|---------|--------|
| `class:started` | `{ teacherName, subject }` | Show "🔴 Live Class" banner |
| `class:ended` | — | Remove live banner |
| `class:announcement` | `{ title, body }` | Toast notification + chat card |

---

## Namespace: `/sync`

Used for offline data handshake

| Event | Direction | Payload | Action |
|-------|-----------|---------|--------|
| `sync:request` | Client → Server | `{ lastSyncedAt }` | Server checks for new data |
| `sync:data` | Server → Client | `{ newLessons[], updatedProgress[] }` | Client updates IDB |
| `sync:acknowledge` | Client → Server | `{ processed: true }` | Server marks sync complete |
