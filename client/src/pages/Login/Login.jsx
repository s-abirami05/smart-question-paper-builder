import { useState } from "react";
import { loginUser } from "../../services/authService";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser({
        email,
        password,
      });


      // Save JWT Token

      localStorage.setItem(
        "token",
        data.token
      );


      alert(data.message);


    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <div className="bg-white p-8 rounded-lg shadow-md w-96">


        <h2 className="text-2xl font-bold text-center mb-6">
          Faculty Login
        </h2>


        <form onSubmit={handleSubmit}>


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
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Login
          </button>


        </form>


      </div>


    </div>

  );

}


export default Login;