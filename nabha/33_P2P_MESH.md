# 33 — P2P Mesh Networking (Local Classroom Sync)

**Status: Phase 5 / Future Feature**

---

## Concept
> "local-first, peer-to-peer (P2P) mesh networking layer on mobile devices that enables near-real-time collaborative learning and progress synchronization between students and teachers within the school premises (the Edge), independent of the main internet grid"

When there is **no internet at all**, devices on the same Wi-Fi or hotspot can still:
- Sync lesson progress
- Run live quizzes
- Chat within the classroom

---

## Architecture

```
[Teacher Device] ←── WebRTC DataChannel ──→ [Student 1]
                 ←── WebRTC DataChannel ──→ [Student 2]
                 ←── WebRTC DataChannel ──→ [Student 3]
                              ↓ (nightly, when internet available)
                       [MongoDB Atlas Cloud]
```

The teacher's device acts as the **local node** (not a full server — just a peer with coordinator role).

---

## Tech: WebRTC DataChannels

WebRTC works on same LAN without internet for signaling if we use a **local signaling fallback**:

### Option A: QR Code Handshake
1. Teacher's device generates a QR code with local IP + WebRTC offer SDP
2. Students scan QR code → get offer → send answer back via local HTTP
3. WebRTC DataChannel established
4. No internet required for this step (uses local Wi-Fi)

### Option B: mDNS Discovery
1. Teacher app advertises itself via mDNS (`vidyasetu-teacher.local`)
2. Student app discovers via mDNS query
3. WebRTC offer/answer exchanged over local HTTP
4. DataChannel opens

---

## Data Synced Over P2P

| Data | Direction | Format |
|------|-----------|--------|
| New lessons (since last sync) | Teacher → Students | JSON + binary blob |
| Student progress | Students → Teacher | JSON |
| Quiz questions | Teacher → Students | JSON |
| Quiz answers | Students → Teacher | JSON |
| Chat messages | Bidirectional | JSON |

---

## Teacher as Local Coordinator
- Teacher device stores all student progress locally during offline session
- When internet restores: teacher device pushes everything to MongoDB Atlas
- Students' own IndexedDB also has their local copy (redundancy)

---

## Implementation Files (future)
```
/src/p2p/
├── peerManager.js       # Create/manage WebRTC peer connections
├── signalingLocal.js    # Local signaling via LAN HTTP or QR
├── dataChannel.js       # Send/receive data over DataChannel
├── meshSync.js          # Orchestrate sync between peers
└── discovery.js         # mDNS or QR-based peer discovery
```

---

## Limitations
- All devices must be on same Wi-Fi network or hotspot
- Teacher device must be active (no sleep)
- Works with up to ~30 simultaneous peer connections (browser limit)
- Large video files not transmitted P2P (too slow) — only metadata and progress
