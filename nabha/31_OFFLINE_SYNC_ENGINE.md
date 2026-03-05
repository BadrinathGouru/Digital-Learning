# 31 — Offline Sync Engine (Edge-to-Cloud)

---

## Architecture Philosophy
> "asynchronous data queuing to guarantee zero-loss offline tracking and one-time nightly synchronization to the central cloud"

Three tiers:
```
Device (IndexedDB) → Background Sync → MongoDB Atlas (Cloud)
         ↕
   P2P Mesh (future — local classroom sync without internet)
```

---

## Sync Queue Manager (`/src/offline/syncQueue.js`)

### Add to Queue
```js
export async function enqueue(action) {
  const db = await openDB();
  await db.add('syncQueue', {
    method: action.method,       // "POST" | "PUT" | "PATCH"
    url: action.url,
    body: action.body,
    createdAt: new Date().toISOString(),
    attempts: 0
  });
}
```

### Flush Queue (called on `online` event)
```js
export async function flushQueue() {
  const db = await openDB();
  const all = await db.getAll('syncQueue');
  
  for (const item of all) {
    try {
      await axios({ method: item.method, url: item.url, data: item.body });
      await db.delete('syncQueue', item.id);        // Remove on success
    } catch (err) {
      if (item.attempts >= 3) {
        await db.delete('syncQueue', item.id);      // Give up after 3 tries
        logFailedSync(item);                         // Save to error log
      } else {
        await db.put('syncQueue', { ...item, attempts: item.attempts + 1 });
      }
    }
  }
}
```

---

## What Gets Queued

| User Action | Queue Entry |
|-------------|-------------|
| Video progress update | `PATCH /api/progress/update` |
| Quiz submission | `POST /api/quiz/submit` |
| Badge earned | `PATCH /api/users/:id/badges` |
| Chat message sent | `POST /api/messages` |
| Lesson marked complete | `PATCH /api/progress/update` |

---

## Conflict Resolution Strategy

When syncing after offline, conflicts can occur (e.g. server has newer data):

| Conflict Type | Resolution |
|--------------|-----------|
| Progress % conflict | **Take higher value** (student may have rewatched) |
| Quiz already submitted | **Skip re-submission** (check 409 response) |
| Message timestamp | **Use client timestamp** (`recordedAt` from queue) |
| Badge already awarded | **Idempotent** — server ignores duplicate badge grants |

Server returns `409 Conflict` for duplicate submissions → client deletes from queue without retrying.

---

## Nightly Sync (Service Worker)

```js
// In sw.js
self.addEventListener('periodicsync', event => {
  if (event.tag === 'nightly-sync') {
    event.waitUntil(performNightlySync());
  }
});

async function performNightlySync() {
  // 1. Flush all queued actions
  await flushQueue();
  // 2. Pull new lessons from server
  const newLessons = await fetch('/api/lessons?updatedSince=' + lastSync);
  // 3. Update IndexedDB
  await updateLocalLessons(newLessons);
  // 4. Update lastSync timestamp
}
```

Registration:
```js
navigator.serviceWorker.ready.then(reg => {
  reg.periodicSync.register('nightly-sync', { minInterval: 24 * 60 * 60 * 1000 });
});
```

---

## SyncContext (`/src/context/SyncContext.jsx`)

Exposes to all components:
```js
{
  isOnline: Boolean,
  queueSize: Number,           // Pending actions count
  lastSynced: Date,
  isSyncing: Boolean,
  syncNow: Function,           // Manual trigger
}
```

### SyncStatus Component
Shows in header or profile page:
- "✓ Synced 2 min ago" (emerald)
- "⏳ 3 actions pending sync" (amber, shown when offline)
- "🔄 Syncing..." (indigo, animated)
- "⚠ Sync failed — retry" (red, tap to retry)
