# Vidya Sahayak - Digital Learning Platform

Vidya Sahayak is a digital learning platform specifically built for rural students in Punjab (e.g., Nabha). It aims to provide accessible, high-quality educational material to students using low-end mobile devices, accommodating varied networking conditions.

## 🚀 Features
- **Student Portal**: A "Coursera-style" mobile-first learning interface designed for standard classes. Features include "Continue Learning" progress trackers, a full-screen interactive test UI, and gamification points.
- **Teacher Dashboard**: A comprehensive hub for tracking class-wide analytics, assigning lessons, and instantly grading assessments.
- **Real-Time Synchronization**: Powered by Socket.IO, Teachers instantly see when students are online and watch active progress dynamically update in real time.
- **Offline & Mobile Ready**: Built using a responsive mobile-first Tailwind design pattern. Packaged natively for Android using Capacitor.
- **Robust Backend API**: Secure Node.js/Express server handling JWT user authentication and interactions with MongoDB Atlas.

## 🛠 Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Capacitor (Android APK wrapper).
- **Backend**: Node.js, Express.js, Socket.IO.
- **Database**: MongoDB Atlas via Mongoose.

## 🏃‍♂️ Running Locally

### Backend
1. Navigate to the backend directory:
   `cd backend`
2. Install dependencies:
   `npm install`
3. Make sure you configure your MongoDB connection string inside your `.env` file.
4. Run the server:
   `npm run dev`

### Frontend
1. Navigate to the frontend directory:
   `cd frontend`
2. Install dependencies:
   `npm install`
3. Run the development server:
   `npm run dev`

### Android App
To compile the Android APK:
1. `cd frontend`
2. Run `npm run build`
3. Run `npx cap sync android`
4. Open the `frontend/android` folder in Android Studio and build the APK!
