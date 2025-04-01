import React from "react";
import { Link } from "react-router-dom";


const Content = () => {

  return (
    <div className="flex items-center justify-center">
      <ul className="flex items-center justify-around w-full text-2xl text-gray-500">
        <li className="p-2"><Link to="/">Home</Link></li>
        <li className="p-2"><Link to="/about">About</Link></li>
        <li className="p-2"><Link to="/contact">Contact</Link></li>
        <li className="p-2"><Link to="/contact">Services</Link></li>
        <li className="p-2"><Link to="/contact">URL</Link></li>
      </ul>
    </div>
  );

}


export default Content;
