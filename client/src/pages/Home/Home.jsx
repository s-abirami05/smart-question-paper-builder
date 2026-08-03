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


export default Home;