# Smart Question Paper Builder

## 📌 Project Overview

Smart Question Paper Builder is a web-based application that helps faculty members create and manage question papers efficiently. The system allows users to manage departments, semesters, subjects, course outcomes, upload syllabus files, and prepare structured question papers.

The project follows a full-stack architecture with React.js for frontend development and Node.js, Express.js, and MongoDB for backend services.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### 🏢 Department Management

* Add Department
* View Department List
* Manage Department Details

### 📚 Academic Management

* Add Semester
* Map Semester with Department
* Add Subjects
* Manage Subject Information

### 🎯 Course Outcome Management

* Add Course Outcomes (CO1, CO2, etc.)
* Map CO with Subjects
* Maintain learning outcomes

### 📄 Syllabus Management

* Upload Syllabus PDF Files
* Store syllabus details
* Manage uploaded files

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (File Upload)

### Tools

* VS Code
* Git & GitHub
* MongoDB Atlas

---

## 📂 Project Structure

```
smart-question-paper-builder

│
├── client
│   ├── src
│   ├── pages
│   ├── components
│   └── App.jsx
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── uploads
│   │
│   └── server.js
│
├── uploads
├── prediction-rules
├── charts
└── reports
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/s-abirami05/smart-question-paper-builder.git
```

---

## Frontend Setup

Navigate to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Backend Setup

Navigate to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔄 Application Flow

```
User Registration
        ↓
User Login
        ↓
JWT Authentication
        ↓
Department Creation
        ↓
Semester Management
        ↓
Subject Management
        ↓
Course Outcome Creation
        ↓
Syllabus Upload
        ↓
Question Paper Generation
```

---

## 👩‍💻 Team Contributions

### Member 1 - Authentication & Master Data Module

Responsibilities:

* Project Structure Setup
* Authentication System
* JWT Security
* Department Management
* Semester Management
* Subject Management
* Course Outcome Management
* Syllabus Upload Module

---

## 📌 Future Enhancements

* Automatic Question Paper Generation
* AI-based Question Prediction
* Difficulty Level Analysis
* Bloom's Taxonomy Mapping
* Question Paper Export as PDF
* Analytics Dashboard

---

## 📄 License

This project is developed for academic and learning purposes.
