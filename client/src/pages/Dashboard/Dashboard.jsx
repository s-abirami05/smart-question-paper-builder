import { useNavigate } from "react-router-dom";


function Dashboard() {


  const navigate = useNavigate();



  return (

    <div className="min-h-screen bg-gray-100 p-10">


      <h1 className="text-4xl font-bold text-center mb-10">
        Dashboard
      </h1>



      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">



        <button

          onClick={() => navigate("/department")}

          className="bg-blue-600 text-white p-6 rounded-lg text-xl font-semibold hover:bg-blue-700"

        >

          Department

        </button>




        <button

          onClick={() => navigate("/semester")}

          className="bg-green-600 text-white p-6 rounded-lg text-xl font-semibold hover:bg-green-700"

        >

          Semester

        </button>




        <button

          onClick={() => navigate("/subject")}

          className="bg-purple-600 text-white p-6 rounded-lg text-xl font-semibold hover:bg-purple-700"

        >

          Subject

        </button>




        <button

          onClick={() => navigate("/question-builder")}

          className="bg-orange-600 text-white p-6 rounded-lg text-xl font-semibold hover:bg-orange-700"

        >

          Create Question Paper Builder

        </button>



      </div>


    </div>

  );

}


export default Dashboard;