import { useEffect, useState } from "react";
import axios from "axios";


function Semester() {


  const [semesterName, setSemesterName] = useState("");

  const [semesters, setSemesters] = useState([]);



  // Get Semesters

  const fetchSemesters = async()=>{

    try{

      const response = await axios.get(
        "http://localhost:5000/api/semesters"
      );


      setSemesters(response.data);


    }catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    fetchSemesters();

  },[]);





  // Add Semester

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      await axios.post(

        "http://localhost:5000/api/semesters",

        {
          name: semesterName
        }

      );


      setSemesterName("");

      fetchSemesters();



    }catch(error){

      console.log(error);

    }


  };




  return (

    <div className="min-h-screen bg-gray-100 p-10">


      <h1 className="text-4xl font-bold text-center mb-10">

        Semester Management

      </h1>




      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">


        <form onSubmit={handleSubmit}>


          <label className="font-semibold">

            Semester Name

          </label>


          <input

            type="text"

            value={semesterName}

            onChange={(e)=>setSemesterName(e.target.value)}

            placeholder="Enter Semester Name"

            className="w-full border p-3 rounded mt-2 mb-5"

          />



          <button

            className="bg-green-600 text-white px-6 py-3 rounded"

          >

            Add Semester

          </button>


        </form>


      </div>





      <div className="max-w-xl mx-auto mt-10">


        <h2 className="text-2xl font-bold mb-5">

          Semester List

        </h2>



        {

          semesters.map((semester)=>(


            <div

              key={semester._id}

              className="bg-white p-4 rounded shadow mb-3"

            >

              {semester.name}


            </div>


          ))

        }



      </div>



    </div>

  );

}


export default Semester;