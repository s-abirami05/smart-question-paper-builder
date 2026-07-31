import { useEffect, useState } from "react";
import axios from "axios";


function Semester() {

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [department, setDepartment] = useState("");

  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);


  const token = localStorage.getItem("token");


  // Get Departments

  const fetchDepartments = async () => {

    const response = await axios.get(
      "http://localhost:5000/api/departments",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    setDepartments(response.data);

  };


  // Get Semesters

  const fetchSemesters = async () => {

    const response = await axios.get(
      "http://localhost:5000/api/semesters",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    setSemesters(response.data);

  };



  useEffect(()=>{

    fetchDepartments();
    fetchSemesters();

  },[]);



  // Add Semester

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      const response = await axios.post(

        "http://localhost:5000/api/semesters",

        {
          name,
          number,
          department,
        },

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );


      alert(response.data.message);


      setName("");
      setNumber("");
      setDepartment("");

      fetchSemesters();


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
          Semester Management
        </h2>



        <form onSubmit={handleSubmit}>


          <input

          className="border p-2 mr-3"

          placeholder="Semester Name"

          value={name}

          onChange={(e)=>setName(e.target.value)}

          />



          <input

          className="border p-2 mr-3"

          placeholder="Semester Number"

          value={number}

          onChange={(e)=>setNumber(e.target.value)}

          />



          <select

          className="border p-2 mr-3"

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



          <button

          className="bg-blue-600 text-white px-5 py-2 rounded"

          >

          Add Semester

          </button>


        </form>



        <hr className="my-6"/>



        <h3 className="text-xl font-semibold mb-3">
          Semester List
        </h3>



        {
          semesters.map((sem)=>(

            <div
            key={sem._id}
            className="border p-3 mb-2"
            >

              <p>
                {sem.name}
              </p>

              <p>
                Semester No: {sem.number}
              </p>

              <p>
                Department:
                {" "}
                {sem.department?.name}
              </p>


            </div>

          ))
        }



      </div>


    </div>

  );

}


export default Semester;