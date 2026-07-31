import { useEffect, useState } from "react";
import axios from "axios";


function Syllabus() {


  const [subject, setSubject] = useState("");

  const [file, setFile] = useState(null);

  const [subjects, setSubjects] = useState([]);



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



  useEffect(()=>{

    fetchSubjects();

  },[]);






  // Upload Syllabus

  const handleUpload = async(e)=>{


    e.preventDefault();



    try{


      const formData = new FormData();


      formData.append(
        "syllabus",
        file
      );


      formData.append(
        "subject",
        subject
      );




      const response = await axios.post(


        "http://localhost:5000/api/syllabus/upload",


        formData,


        {

          headers:{

            Authorization:`Bearer ${token}`,

            "Content-Type":"multipart/form-data"

          }

        }


      );




      alert(response.data.message);



      setFile(null);
      setSubject("");



    }catch(error){


      alert(

        error.response?.data?.message ||
        "Upload Failed"

      );


    }


  };





  return(


    <div className="min-h-screen bg-gray-100 flex justify-center items-center">



      <div className="bg-white p-8 rounded shadow w-96">



        <h2 className="text-2xl font-bold mb-6">

          Upload Syllabus PDF

        </h2>





        <form onSubmit={handleUpload}>




          <select

          className="w-full border p-3 mb-4"

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

          type="file"

          accept="application/pdf"

          className="mb-4"

          onChange={(e)=>setFile(e.target.files[0])}

          />






          <button

          className="bg-green-600 text-white w-full p-3 rounded"

          >

          Upload PDF

          </button>




        </form>



      </div>


    </div>


  );


}


export default Syllabus;