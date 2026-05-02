# 🚀 Project Tracker (Full Stack Web App)

A simple and modern **Project & Task Management System**.

This app allows teams to:
- Create projects
- Assign tasks to users
- Track progress using Kanban board
- Manage roles (Admin / Member)

---

##  Live Demo

🌐 Frontend: https://your-vercel-link.vercel.app  
🌐 Backend: https://your-render-link.onrender.com  

---

## 🧠 Idea Behind This Project

The goal was to build a **real-world team collaboration tool** where:

- Admin can manage users & projects
- Tasks can be assigned to specific members
- Members only see their own tasks
- Status tracking is simple & visual (Kanban)

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## ✨ Features

### 👤 Authentication
- Signup / Login
- JWT-based authentication
- Role-based access (Admin / Member)

---

### 📁 Project Management
- Create project (Admin only)
- Add members to project

---

### ✅ Task Management
- Create task (Admin only)
- Assign task to users (via email)
- Update task status:
  - Todo
  - In Progress
  - Done
- Delete / Edit tasks

---

### 📊 Dashboard
- Total tasks count
- Status-wise count (Todo / In Progress / Done)

---

### 📌 Kanban Board
- Drag-like UI (status-based columns)
- Real-time UI update

---

### 🔐 Role-Based Access
- Admin:
  - Can create users, tasks, projects
  - Can view all tasks
- Member:
  - Can only see assigned tasks
  - Can update their task status

---

### 📱 Responsive UI
- Mobile-friendly layout
- Hamburger sidebar
- Clean modern UI

---

## ⚙️ Installation (Run Locally)

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/project-tracker.git
cd project-tracker