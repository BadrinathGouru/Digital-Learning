# 10 — Student Offline Mode & Sync Engine

---

## Overview
The offline system guarantees **zero-loss progress tracking** using a three-layer approach:
1. **IndexedDB** — stores lesson content, progress records, and queued API calls
2. **Service Worker** — caches static assets and intercepts network requests
3. **Sync Queue** — replays failed/queued API calls when connectivity is restored

---

## IndexedDB Setup (`/src/offline/idb.js`)

### Database Name: `vidyasetu-db` (version 1)

### Object Stores

| Store | KeyPath | Indexes | Holds |
|-------|---------|---------|-------|
| `lessons` | `_id` | `subject`, `grade` | Full lesson JSON |
| `progress` | `localKey` (`studentId_lessonId`) | `studentId` | Progress records |
| `syncQueue` | `id` (autoIncrement) | `createdAt` | Pending API calls |
| `messages` | `_id` | `roomId` | Recent chat messages |
| `user` | `key` | — | Current user profile |

### Setup Code Pattern
```js
import { openDB } from 'idb';

export const db = openDB('vidyasetu-db', 1, {
  upgrade(db) {
    db.createObjectStore('lessons', { keyPath: '_id' });
    const progress = db.createObjectStore('progress', { keyPath: 'localKey' });
    progress.createIndex('studentId', 'studentId');
    const queue = db.createObjectStore('syncQueue', { autoIncrement: true, keyPath: 'id' });
    queue.createIndex('createdAt', 'createdAt');
    db.createObjectStore('messages', { keyPath: '_id' });
    db.createObjectStore('user', { keyPath: 'key' });
  }
});
```

---

## Sync Queue (`/src/offline/syncQueue.js`)

### Queue Entry Structure
```js
{
  id: Number,          // Auto-increment
  method: "POST" | "PUT" | "PATCH",
  url: String,         // e.g. "/api/progress/update"
  body: Object,        // Request payload
  createdAt: Date,
  attempts: Number     // Retry count
}
```

### When to Enqueue
| Action | Queued Call |
|--------|-------------|
| Video progress update | `POST /api/progress/update` |
| Quiz submission | `POST /api/quiz/submit` |
| Badge awarded | `PATCH /api/users/:id/badges` |
| Chat message sent offline | `POST /api/messages` |

### Flush on Reconnect
```js
window.addEventListener('online', async () => {
  const queue = await getAllFromQueue(); // Read all from IDB
  for (const item of queue) {
    try {
      await axios[item.method.toLowerCase()](item.url, item.body);
      await deleteFromQueue(item.id);
    } catch (e) {
      // Increment attempts, keep in queue
    }
  }
});
```

---

## Service Worker (`/public/sw.js`)

### Caching Strategies

| Request Type | Strategy | Cache Name |
|-------------|---------|-----------|
| App shell (HTML/CSS/JS) | Cache First | `app-shell-v1` |
| Lesson API responses | Network First, fallback Cache | `lessons-api` |
| Lesson videos (downloaded) | Cache First | `lesson-media` |
| Lesson PDFs | Cache First | `lesson-media` |
| User profile/progress API | Network First | `user-data` |
| Chat API | Network Only | — |

### Background Sync Registration
```js
// In sw.js
self.addEventListener('sync', event => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(flushProgressQueue());
  }
  if (event.tag === 'sync-messages') {
    event.waitUntil(flushMessageQueue());
  }
});
```

### Registration (in `index.jsx`)
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    // Register background sync
    reg.sync.register('sync-progress');
  });
}
```

---

## Online/Offline Detection (`/src/hooks/useOffline.js`)

```js
export function useOffline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
}
```

---

## Offline UX Behaviors

| Scenario | Behavior |
|----------|---------|
| Student opens app offline | Shows cached home, lessons from IDB |
| Student watches lesson offline | Plays from cached video blob |
| Student submits quiz offline | Saves to IDB queue, shows "Submitted — will sync" |
| Student sends chat offline | Stored locally, sent on reconnect with timestamp |
| Reconnects to internet | Queue flushed, server updated, UI shows "Synced ✓" |
| Lesson not downloaded, offline | Shows "Not available offline. Download when connected." |
| First open ever, offline | Shows "Please connect to set up your account first." |

---

## Edge-to-Cloud Architecture Note
From the project document:
> "local-first, peer-to-peer (P2P) mesh networking layer on mobile devices that enables near-real-time collaborative learning and progress synchronization between students and teachers within the school premises (the Edge), independent of the main internet grid"
> "micro-server technology and asynchronous data queuing to guarantee zero-loss offline tracking and one-time nightly synchronization to the central cloud"

**Phase 1 implementation:** IndexedDB + Service Worker sync (cloud)
**Phase 2 / Future:** P2P mesh via WebRTC DataChannels for local classroom sync (see `33_P2P_MESH.md`)
