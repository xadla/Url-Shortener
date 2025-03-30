import React from "react";


import { Link } from "react-router-dom";
import "./Navbar.css";


class Navbar extends React.Component{
  render() {
    return (

      <nav className="grid grid-cols-[1fr_3fr_1fr] gap-4 p-10 bg-[#FFF4EA] shadow-gray-300 m-10 rounded-2xl">

        <div className="flex items-center justify-center">
          <Link to="/" className="text-3xl text-cyan-600 font-medium">
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
          <a className="px-6 py-3 text-2xl rounded-3xl" href=""><Link>Signup</Link></a>
          <a className="px-6 py-3 text-2xl rounded-3xl" href=""><Link>Login</Link></a>
        </div>

      </nav>

    );
  }
}

export default Navbar;
