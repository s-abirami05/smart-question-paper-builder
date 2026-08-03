import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

import {
  FaGraduationCap,
  FaFileAlt,
  FaLayerGroup,
  FaBrain,
  FaCheckCircle
} from "react-icons/fa";


function Register(){

const navigate = useNavigate();


const [formData,setFormData] = useState({
  name:"",
  email:"",
  password:""
});



const handleChange=(e)=>{

setFormData({
 ...formData,
 [e.target.name]:e.target.value
});

};




const handleSubmit=async(e)=>{

e.preventDefault();

try{

await registerUser(formData);

alert("Registration Successful");

navigate("/login");

}
catch(error){

alert("Registration Failed");

}

};




return(

<div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">


<div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">



{/* LEFT BRAND SECTION */}


<div className="hidden lg:flex bg-linear-to-br from-violet-700 via-purple-600 to-indigo-700 text-white p-12 flex-col justify-center">


<div className="flex items-center gap-3">

<div className="bg-white/20 p-4 rounded-2xl">

<FaGraduationCap className="text-4xl"/>

</div>


<h1 className="text-3xl font-bold">

SQPB

</h1>

</div>




<h2 className="text-5xl font-extrabold mt-10 leading-tight">

Smart Question
<br/>
Paper Builder

</h2>



<p className="mt-6 text-lg text-purple-100 leading-relaxed">

Create, manage and generate university
question papers with smart academic tools.

</p>





<div className="mt-10 space-y-5">


<div className="flex items-center gap-4">

<div className="bg-white/20 p-3 rounded-lg">

<FaFileAlt/>

</div>


<p className="font-medium">

Digital Question Paper Creation

</p>


</div>






<div className="flex items-center gap-4">


<div className="bg-white/20 p-3 rounded-lg">

<FaLayerGroup/>

</div>


<p className="font-medium">

Department & Subject Management

</p>


</div>







<div className="flex items-center gap-4">


<div className="bg-white/20 p-3 rounded-lg">

<FaBrain/>

</div>


<p className="font-medium">

CO & Bloom Level Mapping

</p>


</div>







<div className="flex items-center gap-4">


<div className="bg-white/20 p-3 rounded-lg">

<FaCheckCircle/>

</div>


<p className="font-medium">

University Format Ready Papers

</p>


</div>




</div>



</div>







{/* REGISTER SECTION */}



<div className="p-8 md:p-12 flex items-center">


<div className="w-full">



<h2 className="text-4xl font-bold text-gray-800">

Create Account

</h2>



<p className="text-gray-500 mt-3">

Join as a faculty member and start creating papers

</p>





<form

onSubmit={handleSubmit}

className="mt-8 space-y-5"

>




<div>

<label className="text-sm font-semibold text-gray-700">

Full Name

</label>


<input

name="name"

value={formData.name}

onChange={handleChange}

placeholder="Enter your full name"

className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 outline-none"

/>


</div>







<div>

<label className="text-sm font-semibold text-gray-700">

Email Address

</label>


<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter your email"

className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 outline-none"

/>


</div>








<div>

<label className="text-sm font-semibold text-gray-700">

Password

</label>


<input

type="password"

name="password"

value={formData.password}

onChange={handleChange}

placeholder="Create secure password"

className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 outline-none"

/>


</div>








<button

className="w-full bg-linear-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition"

>

Create Account

</button>





</form>






<div className="flex items-center gap-3 my-7">


<div className="h-px bg-gray-200 flex-1"></div>


<span className="text-gray-400">

OR

</span>


<div className="h-px bg-gray-200 flex-1"></div>


</div>






<button

className="w-full border border-gray-200 py-3 rounded-xl hover:bg-gray-50"

>

Continue with Google

</button>






<p className="text-center text-gray-500 mt-7">


Already registered?


<Link

to="/login"

className="text-violet-600 font-semibold ml-2"

>

Login

</Link>


</p>



</div>


</div>




</div>


</div>

)

}


export default Register;