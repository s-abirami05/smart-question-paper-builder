import { useEffect, useState } from "react";
import axios from "axios";


function Department() {

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [departments, setDepartments] = useState([]);


  const token = localStorage.getItem("token");


  // Get Departments

  const fetchDepartments = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      setDepartments(response.data);


    } catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchDepartments();

  },[]);



  // Add Department

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      const response = await axios.post(

        "http://localhost:5000/api/departments",

        {
          name,
          code,
        },

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );


      alert(response.data.message);


      setName("");
      setCode("");

      fetchDepartments();


    }catch(error){

      alert(
        error.response?.data?.message ||
        "Failed"
      );

    }

  };



  // Delete Department

  const deleteDepartment = async(id)=>{


    try{

      await axios.delete(

        `http://localhost:5000/api/departments/${id}`,

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );


      alert("Department Deleted");

      fetchDepartments();


    }catch(error){

      console.log(error);

    }

  };



  return(

    <div className="min-h-screen bg-gray-100 p-10">


      <div className="bg-white p-6 rounded shadow">


        <h2 className="text-2xl font-bold mb-5">
          Department Management
        </h2>



        <form onSubmit={handleSubmit}>


          <input

          className="border p-2 mr-3"

          placeholder="Department Name"

          value={name}

          onChange={(e)=>setName(e.target.value)}

          />



          <input

          className="border p-2 mr-3"

          placeholder="Department Code"

          value={code}

          onChange={(e)=>setCode(e.target.value)}

          />



          <button

          className="bg-blue-600 text-white px-5 py-2 rounded"

          >

          Add

          </button>


        </form>



        <hr className="my-6"/>



        <h3 className="text-xl font-semibold mb-3">

          Department List

        </h3>



        {
          departments.map((dept)=>(

            <div
            key={dept._id}
            className="flex justify-between border p-3 mb-2"
            >


              <div>

                <p>
                  {dept.name}
                </p>

                <p className="text-gray-500">
                  {dept.code}
                </p>

              </div>



              <button

              onClick={()=>deleteDepartment(dept._id)}

              className="bg-red-500 text-white px-3 py-1 rounded"

              >

              Delete

              </button>


            </div>


          ))
        }


      </div>


    </div>

  );

}


export default Department;