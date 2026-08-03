import { Routes, Route } from "react-router-dom";


// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";

import Department from "./pages/Department/Department";

import QuestionBuilder from "./pages/QuestionBuilder/QuestionBuilder";

import Semester from "./pages/Semester/Semester";
import Subject from "./pages/Subject/Subject";
import CourseOutcome from "./pages/CourseOutcome/CourseOutcome";
import Syllabus from "./pages/Syllabus/Syllabus";


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

  );

}


export default App;