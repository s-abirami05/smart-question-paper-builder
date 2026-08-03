import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from "./pages/Home/Home";


// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
<<<<<<< HEAD

import SelectDetails from "./pages/SelectDetails";

=======

import Department from "./pages/Department/Department";

import QuestionBuilder from "./pages/QuestionBuilder/QuestionBuilder";

import Semester from "./pages/Semester/Semester";
import Subject from "./pages/Subject/Subject";
import CourseOutcome from "./pages/CourseOutcome/CourseOutcome";
import Syllabus from "./pages/Syllabus/Syllabus";
>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045


// Routes
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {


<<<<<<< HEAD



  return (

=======
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
>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045


    <BrowserRouter>


<<<<<<< HEAD

      <Routes>





        <Route

          path="/"

          element={<Home />}

        />
=======

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

>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045




<<<<<<< HEAD

        <Route

          path="/login"

          element={<Login />}

        />





        <Route

          path="/register"

          element={<Register />}

        />





        <Route

          path="/dashboard"

          element={<Dashboard />}

        />

        <Route 
path="/select-details" 
element={<SelectDetails/>}
/>





      </Routes>





    </BrowserRouter>


=======
      <Route

        path="/syllabus"

        element={

          <ProtectedRoute>

            <Syllabus />

          </ProtectedRoute>

        }

      />



    </Routes>
>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045

  );



}





export default App;