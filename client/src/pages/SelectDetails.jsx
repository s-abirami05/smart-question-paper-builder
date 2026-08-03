import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SelectDetails(){


const navigate = useNavigate();


const [department,setDepartment] = useState("");
const [semester,setSemester] = useState("");
const [subject,setSubject] = useState("");



const handleContinue = ()=>{

if(!department || !semester || !subject){

alert("Please select all details");

return;

}


navigate("/syllabus");

}




return(

<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">


<div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">


<h1 className="text-3xl font-bold text-gray-800 text-center">

Select Subject Details

</h1>


<p className="text-gray-500 text-center mt-2">

Choose department, semester and subject to continue

</p>





<div className="mt-8 space-y-5">





<div>

<label className="block text-sm font-medium text-gray-700">

Department

</label>


<select

value={department}

onChange={(e)=>setDepartment(e.target.value)}

className="mt-2 w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

>


<option value="">

Select Department

</option>


<option>

Information Technology

</option>


<option>

Computer Science

</option>


<option>

Electronics and Communication

</option>


<option>

Mechanical Engineering

</option>


</select>


</div>








<div>

<label className="block text-sm font-medium text-gray-700">

Semester

</label>


<select

value={semester}

onChange={(e)=>setSemester(e.target.value)}

className="mt-2 w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

>


<option value="">

Select Semester

</option>


<option>

Semester 1

</option>


<option>

Semester 2

</option>


<option>

Semester 3

</option>


<option>

Semester 4

</option>


<option>

Semester 5

</option>


<option>

Semester 6

</option>


<option>

Semester 7

</option>


<option>

Semester 8

</option>


</select>


</div>








<div>

<label className="block text-sm font-medium text-gray-700">

Subject

</label>


<select

value={subject}

onChange={(e)=>setSubject(e.target.value)}

className="mt-2 w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

>


<option value="">

Select Subject

</option>


<option>

Data Structures

</option>


<option>

Database Management System

</option>


<option>

Web Technology

</option>


<option>

Machine Learning

</option>


</select>


</div>







<button

onClick={handleContinue}

className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"

>

Continue

</button>




</div>


</div>


</div>

)

}


export default SelectDetails;