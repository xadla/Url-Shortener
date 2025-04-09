import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";


function Navbar() {
  return (

    <nav className="grid grid-cols-[1fr_3fr_1fr] gap-4 p-10 bg-[#FFF4EA] shadow-gray-300 m-10 rounded-2xl">
      <div className="flex items-center justify-center">
        <Link to="/" className="text-3xl text-cyan-600 font-medium transition-transform duration-500 hover:rotate-12 hover:scale-110">
          URL SHORTENER
        </Link>
      </div>
      
      <div className="flex items-center justify-center">
        <ul className="flex items-center justify-around w-full text-2xl text-gray-500">
          <li className="p-2"><Link to="/">Home</Link></li>
          <li className="p-2"><Link to="/about">About</Link></li>
          <li className="p-2"><Link to="/contact">Contact</Link></li>
          <li className="p-2"><Link to="/contact">Services</Link></li>
          <li className="p-2"><Link to="/contact">URL</Link></li>
        </ul>
      </div>

      <div className="flex justify-center items-center gap-4 text-cyan-950 ">
        <Link to="/" className="px-6 py-3 text-2xl rounded-3xl bg-cyan-600 transition-all duration-300 ease-in-out hover:bg-cyan-500" href="">
        Signup
        </Link>
      
        <Link to="/login" className="px-6 py-3 text-2xl rounded-3xl bg-emerald-500 transition-all duration-300 ease-in-out hover:bg-emerald-300" href="">
        Login
        </Link>

        <LogoutButton classes={"px-6 py-3 text-2xl rounded-3xl bg-emerald-500 transition-all duration-300 ease-in-out hover:bg-emerald-300"} />
      </div>
    </nav>

  );
}

export default Navbar;
