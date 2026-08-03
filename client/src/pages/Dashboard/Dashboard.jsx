<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaFileAlt,
  FaUserCircle,
  FaBuilding,
  FaLayerGroup,
  FaBook
} from "react-icons/fa";

=======
import { useNavigate } from "react-router-dom";

>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045

function Dashboard() {


  const navigate = useNavigate();


<<<<<<< HEAD
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);


  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");





  useEffect(() => {

    fetchDepartments();
    fetchSemesters();

  }, []);





  useEffect(() => {

    if(semester){
      fetchSubjects();
    }

  }, [semester]);







  const fetchDepartments = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/departments"
      );

      setDepartments(res.data);

    } catch(error){

      console.log(error);

    }

  };



=======

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
>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045




<<<<<<< HEAD
  const fetchSemesters = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/semesters"
      );

      setSemesters(res.data);

    } catch(error){

      console.log(error);

    }

  };







  const fetchSubjects = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/subjects/semester/${semester}`
      );

      setSubjects(res.data);


    } catch(error){

      console.log(error);

    }

  };







  const handleCreate = () => {


    if(!department || !semester || !subject){

      alert(
        "Please select Department, Semester and Subject"
      );

      return;

    }


    navigate("/question-builder");


  };









return (

<div className="min-h-screen bg-slate-50">



{/* Navbar */}


<header className="bg-white shadow-sm border-b">


<div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">



<div className="flex items-center gap-4">


<div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">

<FaFileAlt className="text-white text-xl"/>

</div>




<div>

<h1 className="text-2xl font-bold text-gray-800">

Smart Question Paper Builder

</h1>


<p className="text-sm text-gray-500">

Faculty Dashboard

</p>


</div>



</div>







<div className="flex items-center gap-3">


<FaUserCircle className="text-4xl text-violet-600"/>


<div>

<h3 className="font-semibold text-gray-800">

Faculty

</h3>


<p className="text-sm text-gray-500">

Logged In

</p>


</div>


</div>



</div>


</header>









{/* Content */}



<div className="flex justify-center px-6 py-16">



<div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-10 md:p-16">




<div className="text-center">


<h2 className="text-4xl font-bold text-gray-800">

Create Question Paper

</h2>



<p className="mt-3 text-gray-500 text-lg">

Select academic details to start building your question paper

</p>



</div>









{/* Step Indicator */}



<div className="flex justify-center items-center gap-8 mt-10">


<div className="text-center">

<div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center mx-auto font-bold">

1

</div>

<p className="mt-2 text-violet-600 font-semibold">

Department

</p>

</div>





<div className="w-12 h-0.5 bg-gray-200"></div>






<div className="text-center">

<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto font-bold">

2

</div>


<p className="mt-2 text-gray-500 font-semibold">

Semester

</p>


</div>





<div className="w-12 h-0.5 bg-gray-200"></div>





<div className="text-center">

<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto font-bold">

3

</div>


<p className="mt-2 text-gray-500 font-semibold">

Subject

</p>


</div>



</div>









{/* Dropdown Cards */}



<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">






{/* Department */}



<div className="bg-violet-50 rounded-2xl p-6">


<div className="text-center">


<div className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center mx-auto">

<FaBuilding className="text-white text-xl"/>

</div>



<h3 className="font-bold text-lg mt-4">

Department

</h3>




<select

value={department}

onChange={(e)=>setDepartment(e.target.value)}

className="mt-5 w-full h-12 px-3 rounded-xl border bg-white"

>


<option value="">

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


</div>


</div>









{/* Semester */}



<div className="bg-violet-50 rounded-2xl p-6">


<div className="text-center">


<div className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center mx-auto">

<FaLayerGroup className="text-white text-xl"/>

</div>



<h3 className="font-bold text-lg mt-4">

Semester

</h3>




<select

value={semester}

onChange={(e)=>setSemester(e.target.value)}

className="mt-5 w-full h-12 px-3 rounded-xl border bg-white"

>


<option value="">

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


</div>


</div>









{/* Subject */}



<div className="bg-violet-50 rounded-2xl p-6">


<div className="text-center">


<div className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center mx-auto">

<FaBook className="text-white text-xl"/>

</div>



<h3 className="font-bold text-lg mt-4">

Subject

</h3>




<select

value={subject}

onChange={(e)=>setSubject(e.target.value)}

className="mt-5 w-full h-12 px-3 rounded-xl border bg-white"

>


<option value="">

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


</div>


</div>






</div>










{/* Create Button */}

<div className="flex justify-center mt-28">


<button

onClick={handleCreate}

className="
bg-violet-600 
hover:bg-violet-700 
text-white 
px-20
py-8 
rounded-2xl 
font-bold 
text-xl 
shadow-xl 
transition 
duration-300
hover:scale-105
"

>

Create Question Paper

</button>


</div>







</div>


</div>




</div>

);

=======
        <button

          onClick={() => navigate("/question-builder")}

          className="bg-orange-600 text-white p-6 rounded-lg text-xl font-semibold hover:bg-orange-700"

        >

          Create Question Paper Builder

        </button>



      </div>


    </div>

  );
>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045

}


export default Dashboard;