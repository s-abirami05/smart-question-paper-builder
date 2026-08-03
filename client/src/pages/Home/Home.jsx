<<<<<<< HEAD
import { Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-10 py-6">

        <div className="flex items-center gap-3">

          <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl">

            <FaFileAlt className="text-violet-600 text-2xl"/>

          </div>

          <h1 className="text-white text-2xl font-bold">

            Smart Question Paper Builder

          </h1>

        </div>

        <div className="flex gap-5">

          <Link
            to="/login"
            className="px-7 py-3 rounded-xl bg-white text-violet-700 font-semibold hover:scale-105 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-7 py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-violet-700 transition"
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-10 pt-20 flex flex-col lg:flex-row items-center justify-between">

        <div className="max-w-xl">

          <h1 className="text-6xl font-extrabold text-white leading-tight">

            Smart Question

            <br/>

            Paper Builder

          </h1>

          <p className="text-violet-100 text-xl mt-8">

            Create university question papers easily with

            Department,

            Semester,

            Subject,

            Course Outcome

            and Syllabus Management.

          </p>

          <div className="flex gap-5 mt-10">

            <Link

              to="/login"

              className="px-8 py-4 rounded-2xl bg-white text-violet-700 font-bold shadow-xl hover:scale-105 transition"

            >

              Get Started

            </Link>

            <Link

              to="/register"

              className="px-8 py-4 rounded-2xl border border-white text-white font-bold hover:bg-white hover:text-violet-700 transition"

            >

              Register

            </Link>

          </div>

        </div>

        {/* Right Side */}

        <div className="mt-16 lg:mt-0">

          <div className="bg-white rounded-3xl shadow-2xl p-10 w-[420px]">

            <h2 className="text-3xl font-bold text-gray-800">

              Faculty Portal

            </h2>

            <p className="text-gray-500 mt-3">

              Manage Question Papers

            </p>

            <div className="mt-8 space-y-5">

              <div className="bg-violet-50 rounded-2xl p-5">

                📚 Department Management

              </div>

              <div className="bg-violet-50 rounded-2xl p-5">

                📖 Semester Management

              </div>

              <div className="bg-violet-50 rounded-2xl p-5">

                📘 Subject Management

              </div>

              <div className="bg-violet-50 rounded-2xl p-5">

                🎯 Course Outcome

              </div>

              <div className="bg-violet-50 rounded-2xl p-5">

                📄 Upload Syllabus

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

=======
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate();


  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">


      <h1 className="text-4xl font-bold mb-8">
        Smart Question Paper Builder
      </h1>



      <div className="flex gap-5">


        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-8 py-3 rounded"
        >
          Register
        </button>



        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 text-white px-8 py-3 rounded"
        >
          Login
        </button>


      </div>


    </div>

  );

}


>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045
export default Home;