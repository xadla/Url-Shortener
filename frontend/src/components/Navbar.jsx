import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosSettings } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { PiDiamondsFourLight } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { RiUserAddLine } from "react-icons/ri";

import LogoutButton from "./Logout";
import useAuth from "../auth/AuthContext";
import ClickOutside from "./ClickOutside";


function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  ClickOutside(dropdownRef, closeDropdown);

  return (
    <nav className="grid grid-cols-[1fr_3fr_1fr] gap-4 p-10 bg-[#FFF4EA] shadow-gray-300 m-10 rounded-2xl">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Link to="/" className="text-3xl text-cyan-600 font-medium transition-transform duration-500 hover:rotate-6 hover:scale-110">
          URL SHORTENER
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex items-center justify-center">
        <ul className="flex items-center justify-around w-full text-2xl text-gray-500">
          <li className="p-2 hover:text-emerald-700 duration-300 transform hover:rotate-6"><Link to="/about">About</Link></li>
          <li className="p-2 hover:text-emerald-700 duration-300 transform hover:rotate-6"><Link to="/contact">Contact</Link></li>
          <li className="p-2 hover:text-emerald-700 duration-300 transform hover:rotate-6"><Link to="/services">Services</Link></li>
          <li className="p-2 hover:text-emerald-700 duration-300 transform hover:rotate-6"><Link to="/create-url">Create URL</Link></li>
        </ul>
      </div>

      {/* Right Side */}
      {user ? (
        <div className="relative flex items-center justify-center gap-4">
          {/* Dropdown Toggle */}
          <button
            onClick={toggleDropdown}
            className="px-6 cursor-pointer py-3 text-2xl rounded-3xl bg-cyan-600 text-white transition duration-300 hover:bg-cyan-500"
          >
            {user.username || "Account"}
            <IoIosArrowDown
              className={`inline transition-transform duration-300 ml-2 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg z-10 text-lg">
              <Link to="/profile" className="px-4 py-2 hover:bg-gray-100 flex items-center justify-left">
              <FaUserCog className="inline text-2xl mr-2" />
              My Profile
              </Link>
              <Link to="/my-urls" className="px-4 py-2 hover:bg-gray-100 flex items-center justify-left">
              <PiDiamondsFourLight className="inline text-2xl mr-2" />
              My URLs
              </Link>
              <Link to="/settings" className="px-4 py-2 hover:bg-gray-100 flex items-center justify-left">
              <IoIosSettings className="inline text-2xl mr-2" />
              Settings
              </Link>
              <div className="border-t my-2"></div>
              <div className="px-4 pb-2">
                <LogoutButton classes="w-full text-red-600 hover:text-red-800 cursor-pointer flex items-center" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 text-cyan-950">
          <Link to="/register" className="px-6 py-3 text-2xl rounded-3xl bg-cyan-600 transition-all duration-300 ease-in-out hover:bg-cyan-500">
            <RiUserAddLine className="inline text-2xl mr-2" />
            Signup
          </Link>
          <Link to="/login" className="flex justify-center items-center px-6 py-3 text-2xl rounded-3xl bg-emerald-500 transition-all duration-300 ease-in-out hover:bg-emerald-300">
            <CiLogin className="inline text-2xl mr-2" />
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
