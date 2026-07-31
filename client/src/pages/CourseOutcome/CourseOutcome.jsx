import { useEffect, useState } from "react";
import axios from "axios";


function CourseOutcome() {


  const [subject, setSubject] = useState("");

  const [coCode, setCoCode] = useState("");
  const [description, setDescription] = useState("");


  const [subjects, setSubjects] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState([]);



  const token = localStorage.getItem("token");



  // Get Subjects

  const fetchSubjects = async()=>{

    try{

      const response = await axios.get(

        "http://localhost:5000/api/subjects",

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      setSubjects(response.data);


    }catch(error){

      console.log(error);

    }

  };




  // Get CO List

  const fetchCO = async()=>{


    try{


      const response = await axios.get(

        "http://localhost:5000/api/course-outcomes",

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      setCourseOutcomes(response.data);



    }catch(error){

      console.log(error);

    }


  };




  useEffect(()=>{

    fetchSubjects();
    fetchCO();

  },[]);





  // Add CO

  const handleSubmit = async(e)=>{


    e.preventDefault();



    try{


      const response = await axios.post(

        "http://localhost:5000/api/course-outcomes",

        {
          subject,
          coCode,
          description
        },


        {

          headers:{
            Authorization:`Bearer ${token}`
          }

        }

      );



      alert(response.data.message);



      setSubject("");
      setCoCode("");
      setDescription("");



      fetchCO();



    }catch(error){


      alert(

        error.response?.data?.message ||
        "Failed"

      );


    }


  };





  return(


    <div className="min-h-screen bg-gray-100 p-10">


      <div className="bg-white p-6 rounded shadow">


        <h2 className="text-2xl font-bold mb-5">

          Course Outcome Management

        </h2>




        <form onSubmit={handleSubmit}>


          <select

          className="border p-2 mr-3"

          value={subject}

          onChange={(e)=>setSubject(e.target.value)}

          >


            <option>
              Select Subject
            </option>



            {
              subjects.map((sub)=>(

                <option

                key={sub._id}

                value={sub._id}

                >

                  {sub.name}

                </option>


              ))
            }



          </select>





          <input

          className="border p-2 mr-3"

          placeholder="CO Code (CO1)"

          value={coCode}

          onChange={(e)=>setCoCode(e.target.value)}

          />





          <input

          className="border p-2 mr-3"

          placeholder="Description"

          value={description}

          onChange={(e)=>setDescription(e.target.value)}

          />





          <button

          className="bg-blue-600 text-white px-5 py-2 rounded"

          >

          Add CO

          </button>



        </form>





        <hr className="my-6"/>





        <h3 className="text-xl font-semibold">

          Course Outcome List

        </h3>





        {

          courseOutcomes.map((co)=>(


            <div

            key={co._id}

            className="border p-3 mt-3"


            >


              <p>

                {co.coCode}

              </p>


              <p>

                {co.description}

              </p>



            </div>


          ))

        }




      </div>


    </div>


  );


}


export default CourseOutcome;