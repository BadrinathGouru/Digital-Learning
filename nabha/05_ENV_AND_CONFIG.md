# 05 — Environment Variables & Configuration

---

## Backend `.env` (`/server/.env`)
```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/vidyasetu

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=30d

# Firebase Admin SDK
FIREBASE_PROJECT_ID=vidya-setu
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=ap-south-1
AWS_S3_BUCKET=vidya-setu-media

# Redis (Upstash)
REDIS_URL=redis://default:password@upstash-url:6379

# CORS
CLIENT_URL=https://vidyasetu.vercel.app
```

---

## Frontend `.env` (`/client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=vidya-setu.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vidya-setu
VITE_FIREBASE_STORAGE_BUCKET=vidya-setu.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:123:web:abc
```

---

## Backend `package.json`
```json
{
  "name": "vidya-setu-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "socket.io": "^4.6.1",
    "jsonwebtoken": "^9.0.0",
    "firebase-admin": "^11.10.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "compression": "^1.7.4",
    "express-rate-limit": "^7.0.0",
    "dotenv": "^16.3.1",
    "multer": "^1.4.5",
    "aws-sdk": "^2.1450.0",
    "redis": "^4.6.7",
    "morgan": "^1.10.0",
    "joi": "^17.10.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

---

## Frontend `package.json`
```json
{
  "name": "vidya-setu-client",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.17.0",
    "axios": "^1.5.1",
    "socket.io-client": "^4.6.1",
    "firebase": "^10.5.0",
    "idb": "^8.0.0",
    "i18next": "^23.5.1",
    "react-i18next": "^13.3.0",
    "recharts": "^2.9.0",
    "react-player": "^2.13.0",
    "workbox-window": "^7.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.1.0",
    "vite": "^4.4.11",
    "vite-plugin-pwa": "^0.16.4",
    "tailwindcss": "^3.3.3",
    "postcss": "^8.4.30",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.51.0"
  }
}
```

---

## PWA Manifest (`/client/public/manifest.json`)
```json
{
  "name": "Vidya Setu",
  "short_name": "VidyaSetu",
  "description": "Digital Learning Platform for Rural Students in Nabha",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#4f46e5",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## Vite Config (`/client/vite.config.js`)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.vidyasetu\.app\/api\/lessons/,
            handler: 'NetworkFirst',
            options: { cacheName: 'lessons-cache' }
          }
        ]
      }
    })
  ]
})
```
