import { useState } from "react";
import { registerUser } from "../../services/authService";


function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await registerUser({
        name,
        email,
        password,
      });


      alert(data.message);


    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">


        <h2 className="text-2xl font-bold text-center mb-6">
          Faculty Register
        </h2>


        <form onSubmit={handleSubmit}>


          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 mb-4 rounded"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />


          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />


          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />


          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded"
          >
            Register
          </button>


        </form>


      </div>

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