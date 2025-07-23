# 🗂️ Task Manager App

A full-stack **Task Management Application** built with **React** (frontend), **Spring Boot** (backend), and **PostgreSQL** (database).  
This app enables users to manage their daily tasks using a modern **Kanban-style board**, **category filtering**, and a clean, responsive UI.
(Inspired from NOTION)
## 🚀 Features

### ✅ Task Management
- Create, update, delete tasks
- Assign tasks to categories (e.g., Work, Personal)
- Set deadlines
- Drag-and-drop task cards between Kanban columns (To Do, In Progress, Done)

### 📚 Categories
- Add and manage custom task categories
- Filter tasks based on selected categories

### 📋 Views
- **Kanban View** – Visual board for task tracking
- **List View** – Simple linear layout of all tasks

### 🧠 Additional Features
- Modal-based task creation and editing
- Color-coded category badges
- Responsive UI for desktop and mobile
- RESTful API with proper DTOs and exception handling
- Swagger/OpenAPI documentation for backend APIs

---

## 🛠️ Tech Stack

| Layer     | Technology                      |
|-----------|----------------------------------|
| Frontend  | React, Tailwind CSS, JavaScript |
| Backend   | Spring Boot, Java, REST API     |
| Database  | PostgreSQL                      |
| Tools     | Axios, Lucide Icons, Swagger UI |

---

## 📁 Project Structure

```

task-manager-app/
├── backend/              # Spring Boot Backend
│   ├── controller/
│   ├── dto/
│   ├── service/
│   ├── model/
│   ├── repository/
│   └── config/
├── frontend/             # React Frontend
│   ├── components/
│   │   ├── Header.js
│   │   ├── KanbanBoard.js
│   │   ├── TaskCard.js
│   │   ├── TaskModal.js
│   │   └── CategoryFilter.js
│   ├── App.js
│   ├── taskService.js
│   └── styles/

````

---

## 🧪 Running Locally

### Prerequisites:
- Node.js & npm
- Java 17+
- PostgreSQL running locally

---

### 🖥️ Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
````

Configure your `application.properties` for PostgreSQL:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/task_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 🌐 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 📓 API Documentation

The backend is documented using Swagger.
Once the backend is running, visit:
`http://localhost:8080/swagger-ui/index.html`

---
## 🤝 Contributing

Pull requests are welcome! If you'd like to suggest improvements, feel free to fork the repo and submit a PR.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```


