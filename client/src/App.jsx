import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// Pages
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";

import Department from "./pages/Department/Department";

import QuestionBuilder from "./pages/QuestionBuilder/QuestionBuilder";

import Semester from "./pages/Semester/Semester";
import Subject from "./pages/Subject/Subject";
import CourseOutcome from "./pages/CourseOutcome/CourseOutcome";
import Syllabus from "./pages/Syllabus/Syllabus";
import QuestionPaperBuilder from "./pages/QuestionPaperBuilder/QuestionPaperBuilder";


// Routes
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {


  return (

    <Routes>


      {/* Public Routes */}


      <Route
        path="/"
        element={<Home />}
      />


      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/register"
        element={<Register />}
      />



      {/* Protected Routes */}


      <Route

  path="/dashboard"

  element={

    <ProtectedRoute>

      <Dashboard />

    </ProtectedRoute>

  }

/>



      <Route

        path="/department"

        element={

          <ProtectedRoute>

            <Department />

          </ProtectedRoute>

        }

      />


      <Route
  path="/question-builder"
  element={
    <ProtectedRoute>
      <QuestionBuilder />
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

import DiagramEditor from "./components/DiagramEditor";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

        {/* Question Paper Builder */}
        <Route
          path="/question-paper-builder"
          element={
            <ProtectedRoute>
              <QuestionPaperBuilder />
            </ProtectedRoute>
          }
        />
        {/* Diagram Editor */}
<Route
  path="/diagram-editor"
  element={
    <ProtectedRoute>
      <DiagramEditor />
    </ProtectedRoute>
  }
/>
          
        

        {/* எதேனும் தவறான /dashboard போன்ற URL வந்தால் நேரடி Auto Redirect */}
        <Route path="/dashboard" element={<Navigate to="/question-paper-builder" replace />} />
        <Route path="*" element={<Navigate to="/question-paper-builder" replace />} />
      </Routes>
    </Router>
  );
}

export default App;