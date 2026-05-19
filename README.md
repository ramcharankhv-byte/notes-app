# 📝 Notes App (MERN Stack)

A clean, modern, and fully responsive Notes application built with the MERN stack (MongoDB, Express, React, Node.js). 

This project is separated into a **Frontend** (React + Vite + Tailwind CSS) and a **Backend** (Node.js + Express + MongoDB) to ensure a scalable and maintainable architecture.

## ✨ Features
- **Create Notes**: Add new notes with a title and content.
- **Read Notes**: View all your notes in a beautiful, card-based layout.
- **Delete Notes**: Remove notes you no longer need.
- **Modern UI**: Designed with Tailwind CSS v4 for a premium, glassmorphism-inspired look with soft shadows and micro-animations.
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop devices.
- **RESTful API**: Custom Express backend utilizing a standardized API response wrapper.

## 🛠️ Tech Stack
**Frontend:**
- React (v19)
- Vite
- Tailwind CSS (v4)
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- CORS & Cookie-Parser

---

## 🚀 Local Development Setup

To run this project locally, you will need to open **two separate terminal windows**—one for the backend and one for the frontend.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Local or MongoDB Atlas)

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Install backend dependencies:
```bash
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
MONGO_URL=your_mongodb_connection_string_here
```

Start the backend server:
```bash
npm run dev
# or
node index.js
```
The server should log: `server running at http://localhost:3000`

### 2. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install frontend dependencies:
```bash
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:3000/api/v1/notes
```

Start the development server:
```bash
npm run dev
```
Click the local link (usually `http://localhost:5173/`) to view your app!

---

## ☁️ Deployment Guide

### Deploying the Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository and select the `backend` folder as your Root Directory.
4. Set the Build Command to `npm install` and the Start Command to `node index.js`.
5. Add your Environment Variables (`MONGO_URL` and `CORS_ORIGIN`). *Wait to set `CORS_ORIGIN` until you have your Vercel URL.*

### Deploying the Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and create a new project.
2. Import your GitHub repository and select the `frontend` folder as your Root Directory.
3. In the Environment Variables section, add `VITE_API_URL` and set it to your Render backend URL (e.g., `https://notes-app-xxxx.onrender.com/api/v1/notes`).
4. Click **Deploy**.

### Final Connection
Once Vercel gives you your live frontend URL (e.g., `https://notes-app-xxxx.vercel.app`):
1. Go back to your **Render** Dashboard.
2. Update the `CORS_ORIGIN` environment variable to equal your Vercel URL (NO trailing slash).
3. Render will automatically restart. Your app is now live and fully connected!

---

## 🔌 API Endpoints

The backend exposes the following REST API endpoints at `/api/v1/notes`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Fetch all notes (sorted by newest) |
| `POST` | `/` | Create a new note (Requires `title` and `content`) |
| `DELETE` | `/:id` | Delete a specific note by its database ID |

