import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from "./pages/Home/Home";

import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";

import SelectDetails from "./pages/SelectDetails";





function App() {





  return (



    <BrowserRouter>



      <Routes>





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



  );



}





export default App;