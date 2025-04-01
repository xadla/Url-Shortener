import React from "react";
import { Link } from "react-router-dom";


const Sign = () => {

  return (
    <div className="flex justify-center items-center gap-4 text-cyan-950 ">
      <Link to="/" className="px-6 py-3 text-2xl rounded-3xl bg-cyan-600 transition-all duration-300 ease-in-out hover:bg-cyan-500" href="">
      Signup
      </Link>
    
      <Link to="/" className="px-6 py-3 text-2xl rounded-3xl bg-emerald-500 transition-all duration-300 ease-in-out hover:bg-emerald-300" href="">
      Login
      </Link>
    </div>
  )

}


export default Sign;
