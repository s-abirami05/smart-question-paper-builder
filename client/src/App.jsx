import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import Department from "./pages/Department/Department";

import Semester from "./pages/Semester/Semester";

import Subject from "./pages/Subject/Subject";

import CourseOutcome from "./pages/CourseOutcome/CourseOutcome";

import Syllabus from "./pages/Syllabus/Syllabus";




function App() {
  return (

    <Routes>

      {/* Public Routes */}

      <Route
        path="/"
        element={<Login />}
      />


      <Route
        path="/register"
        element={<Register />}
      />


      {/* Protected Routes */}

      <Route
        path="/department"
        element={
          <ProtectedRoute>
            <Department />
          </ProtectedRoute>
        }
      />


      <Route
        path="/semester"
        element={
          <ProtectedRoute>
            <Semester />
          </ProtectedRoute>
        }
      />


      <Route
        path="/subject"
        element={
          <ProtectedRoute>
            <Subject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/course-outcome"
        element={
          <ProtectedRoute>
            <CourseOutcome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/syllabus"
        element={
          <ProtectedRoute>
            <Syllabus />
          </ProtectedRoute>
        }
      />


    </Routes>

  );
}

export default App;