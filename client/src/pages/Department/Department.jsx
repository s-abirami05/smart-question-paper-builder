import { useState } from "react";


function Department() {


  const [departmentName, setDepartmentName] = useState("");

  const [departments, setDepartments] = useState([
    "Information Technology"
  ]);



  const handleSubmit = (e) => {

    e.preventDefault();


    if(departmentName.trim() === ""){

      return;

    }


    setDepartments([

      ...departments,

      departmentName

    ]);


    setDepartmentName("");

  };




  return (


    <div className="min-h-screen bg-gray-100 p-10">



      <h1 className="text-4xl font-bold text-center mb-10">

        Department Management

      </h1>





      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">


        <form onSubmit={handleSubmit}>


          <label className="block mb-2 font-semibold">

            Department Name

          </label>




          <input

            type="text"

            value={departmentName}

            onChange={(e)=>setDepartmentName(e.target.value)}

            placeholder="Enter Department Name"

            className="w-full border p-3 rounded mb-5"

          />





          <button

            type="submit"

            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"

          >

            Add Department

          </button>



        </form>



      </div>






      <div className="max-w-xl mx-auto mt-10">



        <h2 className="text-2xl font-bold mb-5">

          Department List

        </h2>





        {

          departments.map((dept,index)=>(


            <div

              key={index}

              className="bg-white p-4 rounded shadow mb-3"

            >

              {dept}


            </div>


          ))

        }



      </div>




    </div>


  );

}


export default Department;