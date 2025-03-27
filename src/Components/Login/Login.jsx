import React, { useState } from "react";
import { authApi } from "../../Utils/AxiosApis";
import Loading from "../Loading/Loading";


// eve.holt@reqres.in
// cityslicka

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (validate(email)) {
      try {
        const response = await authApi.post("/api/login", {
          email: email,
          password: password,
        });
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("tokenValidity", Date.now() + 3 * 60 * 60 * 1000); // 3 hours
        console.log("Login successful:", response.data);
        
        window.location.href = "/users";
      } catch (error) {
        console.error("Login error:", error);
        setError("Login failed: " + (error.response?.data?.error || error.message));
        setIsLoading(false);
      }
    } else {
      setError("Please enter a valid email address");
      setIsLoading(false);
    }
  };

  const validate = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex w-screen h-screen bg-white items-center justify-center px-4 sm:px-6">
        <div className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl">
          <p className="text-xl sm:text-2xl md:text-[1.99rem] font-jost font-medium mb-0 text-center text-[#45054A]">Login</p>
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-4 text-center">
            Let's Make Some Magic Together
          </p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 sm:h-[5vh] outline-none border-b-2 border-[#45054A] mt-4 bg-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 sm:h-[5vh] outline-none border-b-2 border-[#45054A] mt-4 bg-white placeholder-gray-500"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 mt-6 sm:mt-8 mb-2 sm:mb-4">
            <span className="text-xs sm:text-sm">Don't have an account?</span>
            <a
              href="/signup"
              className="text-white text-xs border-2 border-[#45054A] bg-[#45054A] rounded-lg px-2 py-1 transition duration-500 hover:bg-white hover:text-[#45054A] w-fit cursor-pointer"
            >
              SignUp
            </a>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-[#45054A] text-white border-2 border-[#45054A] rounded-lg px-4 py-2 mt-4 transition duration-500 hover:bg-white hover:text-[#45054A] cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;