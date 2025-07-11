## 📋 Task Manager Frontend

This is the **frontend** of the Task Manager application built with **React** and **Vite**. It provides a modern Kanban-style interface to manage tasks, projects, and team members.

### 🧰 Tech Stack

* ⚛️ React
* ⚡ Vite
* 🎨 CSS
* 📦 Axios (for API requests)
* 🎯 Lucide React (for icons)

---

### 🚀 Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

### 📁 Project Structure

```
src/
├── assets/               # Static assets
├── components/           # UI components
│   ├── Header/
│   ├── KanbanBoard/
│   ├── TaskCard/
│   └── TaskModal/
├── services/             # API service calls
├── App.jsx               # Main App component
├── index.css             # Global styles
└── main.jsx              # Entry point
```

---

### 📝 Features

* View tasks in Kanban-style columns.
* Filter and search tasks.
* Create, update, and delete tasks.
* Assign members and manage projects.
* Modal-based task editing interface.

---

### ⚙️ Environment Variables

> *You will need to set up environment variables to connect with the backend once it's ready.*

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

### ❌ .gitignore

Make sure the following folders/files are ignored in Git:

```
node_modules/
dist/
.env
```

---

