import { useEffect, useState } from "react";
import axios from "axios";


function Subject() {

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);


  const token = localStorage.getItem("token");


  // Get Departments

  const fetchDepartments = async()=>{

    const response = await axios.get(
      "http://localhost:5000/api/departments",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setDepartments(response.data);

  };



  // Get Semesters

  const fetchSemesters = async()=>{

    const response = await axios.get(
      "http://localhost:5000/api/semesters",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setSemesters(response.data);

  };



  // Get Subjects

  const fetchSubjects = async()=>{

    const response = await axios.get(
      "http://localhost:5000/api/subjects",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    setSubjects(response.data);

  };



  useEffect(()=>{

    fetchDepartments();
    fetchSemesters();
    fetchSubjects();

  },[]);



  // Add Subject

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      const response = await axios.post(

        "http://localhost:5000/api/subjects",

        {
          name,
          code,
          credits,
          department,
          semester
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      alert(response.data.message);


      setName("");
      setCode("");
      setCredits("");
      setDepartment("");
      setSemester("");


      fetchSubjects();


    }
    catch(error){

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
          Subject Management
        </h2>


        <form onSubmit={handleSubmit}>


          <input
          className="border p-2 mr-2"
          placeholder="Subject Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />



          <input
          className="border p-2 mr-2"
          placeholder="Subject Code"
          value={code}
          onChange={(e)=>setCode(e.target.value)}
          />



          <input
          className="border p-2 mr-2"
          placeholder="Credits"
          value={credits}
          onChange={(e)=>setCredits(e.target.value)}
          />



          <select
          className="border p-2 mr-2"
          value={department}
          onChange={(e)=>setDepartment(e.target.value)}
          >

            <option>
              Select Department
            </option>

            {
              departments.map((dept)=>(

                <option
                key={dept._id}
                value={dept._id}
                >

                {dept.name}

                </option>

              ))
            }

          </select>



          <select
          className="border p-2 mr-2"
          value={semester}
          onChange={(e)=>setSemester(e.target.value)}
          >

            <option>
              Select Semester
            </option>


            {
              semesters.map((sem)=>(

                <option
                key={sem._id}
                value={sem._id}
                >

                {sem.name}

                </option>

              ))
            }


          </select>



          <button
          className="bg-blue-600 text-white px-5 py-2 rounded"
          >

          Add Subject

          </button>


        </form>



        <hr className="my-6"/>



        <h3 className="text-xl font-semibold">
          Subject List
        </h3>



        {
          subjects.map((sub)=>(

            <div
            key={sub._id}
            className="border p-3 mt-3"
            >

              <p>
                {sub.name}
              </p>

              <p>
                Code: {sub.code}
              </p>

              <p>
                Credits: {sub.credits}
              </p>

              <p>
                Department:
                {" "}
                {sub.department?.name}
              </p>

              <p>
                Semester:
                {" "}
                {sub.semester?.name}
              </p>


            </div>

          ))
        }


      </div>


    </div>

  );

}


export default Subject;