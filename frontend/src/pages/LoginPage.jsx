import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import Login from "../auth/Login";
import Message from "../components/Message";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check for empty fields
    if (!username) {
      setError("Username field is required");
      return;
    } else if (!password) {
      setError("Password field is required");
      return;
    }

    try {
      const result = await Login(username, password);
      console.log("Login success:", result.data);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Username or password is wrong. Please try again.");
        } else {
          setError("Server not connected. Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };
  

  return (
    <div className="flex h-[70vh] items-center flex-col justify-center w-[100%]">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col justify-around items-center max-w-[800px] w-[100%] h-[600px] rounded-2xl bg-[#F1EFEC] shadow-2xl p-8"
      >
        <h2 className="text-5xl font-medium text-[#604652]">Welcome Back</h2>
        
        <div className="w-[100%] flex justify-center items-center flex-col space-y-4">
          <div className="w-[70%]">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username..."
              className="w-full outline-0 rounded-[10px] text-2xl p-4 bg-[#D4C9BE] placeholder:text-gray-500"
              required
            />
          </div>
          
          <div className="w-[70%] relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password..."
              className="w-full outline-0 rounded-[10px] text-2xl p-4 bg-[#D4C9BE] pr-12 placeholder:text-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-[#3F4F44] cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          
          <div className="flex gap-3.5 items-center w-[70%]">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="rememberMe" className="text-[#686868]">
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            className="cursor-pointer text-2xl p-2.5 bg-[#60B5FF] text-[#FFECDB] rounded-[5px] w-[50%] mt-2 hover:bg-[#1B56FD] duration-300"
          >
            Login
          </button>

          <div className="text-2xl text-red-500">
            <p>{ error }</p>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div>
            <Link to="/forgot-password" className="text-gray-700 text-2xl hover:text-cyan-700">
              Forgot your Password?
            </Link>
          </div>
          <div>
            <span className="text-gray-700 text-xl">Don't have an account? </span>
            <Link to="/register" className="text-cyan-700 text-xl hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
