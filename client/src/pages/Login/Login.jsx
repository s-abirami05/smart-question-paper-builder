import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

import {
  FaBookOpen,
  FaLayerGroup,
  FaBook,
  FaBullseye,
  FaFilePdf,
  FaGoogle
} from "react-icons/fa";


function Login(){


const navigate = useNavigate();


const [email,setEmail] = useState("");
const [password,setPassword] = useState("");



const handleSubmit = async(e)=>{

e.preventDefault();

try{

const data = await loginUser({
email,
password
});


localStorage.setItem(
"token",
data.token
);


navigate("/dashboard");


}

catch(err){

alert("Login Failed");

}

};




return(

<div className="min-h-screen bg-linear-to-br from-violet-50 to-white flex">



{/* LEFT SIDE */}


<div className="hidden lg:flex w-1/2 bg-linear-to-br from-violet-600 to-indigo-700 text-white flex-col justify-center px-16">


<h1 className="text-5xl font-extrabold leading-tight">

Smart Question
<br/>
Paper Builder

</h1>



<p className="mt-6 text-lg text-violet-100 max-w-lg leading-relaxed">

Create university question papers easily with
Department, Semester, Subject, Course Outcome
and Syllabus Management.

</p>




<div className="grid grid-cols-2 gap-4 mt-10">



<div className="bg-white/10 backdrop-blur p-5 rounded-xl">

<FaBookOpen className="text-3xl"/>

<p className="mt-3 font-semibold">

Department Management

</p>

</div>




<div className="bg-white/10 backdrop-blur p-5 rounded-xl">

<FaLayerGroup className="text-3xl"/>

<p className="mt-3 font-semibold">

Semester Management

</p>

</div>





<div className="bg-white/10 backdrop-blur p-5 rounded-xl">

<FaBook className="text-3xl"/>

<p className="mt-3 font-semibold">

Subject Management

</p>

</div>





<div className="bg-white/10 backdrop-blur p-5 rounded-xl">

<FaBullseye className="text-3xl"/>

<p className="mt-3 font-semibold">

Course Outcome

</p>

</div>





<div className="bg-white/10 backdrop-blur p-5 rounded-xl col-span-2">

<FaFilePdf className="text-3xl"/>

<p className="mt-3 font-semibold">

Upload Syllabus & Generate Papers

</p>

</div>




</div>



</div>







{/* RIGHT LOGIN */}



<div className="w-full lg:w-1/2 flex items-center justify-center p-6">



<div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">



<h2 className="text-3xl font-bold text-gray-800">

Welcome back

</h2>


<p className="text-gray-500 mt-2">

Sign in to your account

</p>






<form 
onSubmit={handleSubmit}
className="mt-8 space-y-5"
>



<div>

<label className="text-sm font-semibold text-gray-700">

Mail ID

</label>


<input

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder="Enter your email"

className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500 outline-none"

/>

</div>






<div>


<div className="flex justify-between">

<label className="text-sm font-semibold text-gray-700">

Password

</label>


<span className="text-sm text-violet-600 cursor-pointer">

Forgot?

</span>


</div>



<input

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

placeholder="Enter password"

className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500 outline-none"

/>



</div>






<button

type="submit"

className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg"

>

Log In

</button>



</form>







<div className="flex items-center gap-3 my-6">


<div className="h-px bg-gray-200 flex-1"></div>


<span className="text-gray-400 text-sm">

or

</span>


<div className="h-px bg-gray-200 flex-1"></div>


</div>






<button

className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50"

>


<FaGoogle className="text-red-500"/>

Continue with Google


</button>






<p className="text-center text-gray-500 mt-7">


Don't have an account?


<Link

to="/register"

className="text-violet-600 font-semibold ml-1"

>

Register

</Link>


</p>



</div>


</div>



</div>


)

}


export default Login;