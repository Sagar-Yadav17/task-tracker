Live link :-https://task-tracker-f-three.vercel.app/
# 🚀 Project Tracker (Full Stack Web App)

A simple and modern **Project & Task Management System** built using the MERN stack.

This app allows teams to:
- Create projects
- Assign tasks to users
- Track progress using Kanban board
- Manage roles (Admin / Member)

---

##  Live Demo

🌐 Frontend: [https://your-vercel-link.vercel.app ](https://task-tracker-f-three.vercel.app/) 
🌐 Backend: [https://your-render-link.onrender.com ](https://task-tracker-b-nwhp.onrender.com/) 

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
git clone https://github.com/Sagar-Yadav17/project-tracker.git
cd backend
Run npm install
Run node server.js

To Run Frontend
cd frontend
Run npm install
Run npm run dev


### To Test This Application
Use the Below credential for **Admin** User
user email : sagar@test.com
password: 123456

Use the Below user for **Member login**
user email : dummy@test.com
password: 123456

