# ✅ Task Planner – Full-Stack Web Application

![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![React](https://img.shields.io/badge/React-Vite-61dafb?logo=react)
![REST API](https://img.shields.io/badge/API-REST-blue)
![Architecture](https://img.shields.io/badge/Architecture-Full--Stack-success)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

A **full-stack task planning application** that allows users to create, manage, and track daily tasks.  
The project is structured as **separate frontend and backend applications** that communicate via a **RESTful API**.

This repository is designed for **academic use, portfolio showcase, and full-stack learning**.

---

## 🌐 Demo
- Frontend: `TBD / Localhost`
- Backend API: `TBD / Localhost`

> Deployment links can be added once the project is deployed (e.g., Vercel, Render, Cloud Run).

---

## ✨ Features
- ✅ Create, read, update, and delete tasks (CRUD)
- ✅ Mark tasks as completed
- ✅ Frontend ↔ Backend REST API integration
- ✅ Modular project structure (frontend / backend separation)
- 🚧 (Optional) Authentication & user-based tasks
- 🚧 (Optional) Categories, priorities, and filters

---

## 🧩 Application Modules

**Frontend**
: React (Vite) application responsible for UI rendering and API consumption.

**Backend**
: Node.js (Express) REST API that manages task data and business logic.

---

## 🏗️ Architecture
```text
React Frontend (Vite)
        |
        v
Node.js / Express REST API
        |
        v
Database (configurable)
```
- Clear separation of concerns

- REST-based communication

- Easily extendable to authentication or microservices

---

## 🛠️ Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React (Vite), CSS         |
| Backend   | Node.js, Express          |
| API       | REST (HTTP / JSON)        |
| Database  | Configurable              |

---

## 📌 Project Structure
```text
task-planner/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
└── README.md
```
Each application is managed independently with its own dependencies.

---

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```text
git clone https://github.com/zeynepeceyunkul/task-planner.git
cd task-planner
```
### 2️⃣ Backend Setup
```text
cd backend
npm install
```
#### Environment Variables (Backend)
Create a .env file inside backend/:


```text
PORT=5000
```
Start the backend server:

```text
npm run dev
# or
npm start
```
Backend will run at:

```text
http://localhost:5000
```
### 3️⃣ Frontend Setup
Open a new terminal:

```text
cd frontend
npm install
```
#### Environment Variables (Frontend)
Create a .env file inside frontend/:

```text
VITE_API_BASE_URL=http://localhost:5000
```
Start the frontend:

```text
npm run dev
```
Frontend will run at:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| GET    | /tasks          | Retrieve all tasks       |
| POST   | /tasks          | Create a new task        |
| PUT    | /tasks/:id      | Update an existing task  |
| DELETE | /tasks/:id      | Delete a task            |

> Replace or extend this table based on your actual API implementation.

---

## 🧪 Running Locally (2 Terminals)
#### Terminal 1 – Backend

```text
cd backend
npm run dev
```
#### Terminal 2 – Frontend

```text
cd frontend
npm run dev
```
---

## 🎓 Academic / Portfolio Notes
This project demonstrates:

- Full-stack web development

- REST API design

- Frontend–backend integration

- Modular and scalable project structure

- Clean and readable codebase

It is suitable for:

- Full-stack & backend learning

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
