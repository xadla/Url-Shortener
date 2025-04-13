import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { HiX } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { debounce } from "lodash";

import useAuth from "../auth/AuthContext";
import CheckUsername from "../auth/CheckUsername";


const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [available, setAvailable] = useState(null);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const checkAvailability = useCallback(
    debounce(async (value) => {
      const avail = await CheckUsername(value);
      setAvailable(avail);
    }, 500),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check for empty fields
    if (!fullname) {
      setError("Fullname field is required");
    } else if (!username) {
      setError("Username field is required");
      return;
    } else if (!password1) {
      setError("Password field is required");
      return;
    } else if (!password2) {
      setError("You need to Confirm your password and continue");
      return;
    }

    // Check for Passwords
    if (password1 != password2) {
      setError("Passwords do not match");
      return;
    }

    if (!available) {
      setError("Username is not Available");
      return;
    }

    try {
      const result = await signup(fullname, username, password1, password2);
      toast.success("Your acount is created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="flex h-[70vh] items-center flex-col justify-center w-[100%]">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col justify-around items-center max-w-[800px] w-[100%] h-[600px] rounded-2xl bg-[#F1EFEC] shadow-2xl p-8"
      >
        <h2 className="text-5xl font-medium text-[#604652]">Welcome</h2>
        
        <div className="w-[100%] flex justify-center items-center flex-col space-y-4">
          <div className="w-[70%]">
            <label htmlFor="fullname" className="sr-only">Fullname</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your Fullname..."
              className="w-full outline-0 rounded-[10px] text-2xl p-4 bg-[#D4C9BE] placeholder:text-gray-500"
              required
            />
          </div>

          <div className="w-[70%] relative">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={
                async (e) => {
                  const value = e.target.value;
                  setUsername(value);
                  if (!value) {
                    setAvailable(null);
                    return;
                  }
                  checkAvailability(value);
                }
              }
              placeholder="Enter your Username..."
              className="w-full outline-0 rounded-[10px] text-2xl p-4 bg-[#D4C9BE] placeholder:text-gray-500"
              required
            />
            {available !== null && (
              <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                {available ? (
                  <TiTick className="text-green-600 text-3xl" />
                ) : (
                  <HiX className="text-red-600 text-3xl" />
                )}
              </span>
            )}
          </div>
          
          <div className="w-[70%] relative">
            <label htmlFor="password1" className="sr-only">Password</label>
            <input
              type={showPassword1 ? "text" : "password"}
              id="password1"
              name="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="Enter your Password..."
              className="w-full outline-0 rounded-[10px] text-2xl p-4 bg-[#D4C9BE] pr-12 placeholder:text-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-[#3F4F44] cursor-pointer"
              aria-label={showPassword1 ? "Hide password" : "Show password"}
            >
              {showPassword1 ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          <div className="w-[70%] relative">
            <label htmlFor="password2" className="sr-only">Confirm Password</label>
            <input
              type={showPassword2 ? "text" : "password"}
              id="password2"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm your Password..."
              className="w-full outline-0 rounded-[10px] text-2xl p-4 bg-[#D4C9BE] pr-12 placeholder:text-gray-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-[#3F4F44] cursor-pointer"
              aria-label={showPassword2 ? "Hide password" : "Show password"}
            >
              {showPassword2 ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          
          <button
            type="submit"
            className="cursor-pointer text-2xl p-2.5 bg-[#60B5FF] text-[#FFECDB] rounded-[5px] w-[50%] mt-2 hover:bg-[#1B56FD] duration-300"
          >
            Signup
          </button>

          <div className="text-2xl text-red-500">
            <p>
              { error }
            </p>
          </div>
        </div>
        <div className="text-center space-y-2">
          <div>
            <span className="text-gray-700 text-xl">Do you have an account? </span>
            <Link to="/login" className="text-cyan-700 text-xl hover:underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
