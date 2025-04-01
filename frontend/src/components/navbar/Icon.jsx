import React from "react";
import { Link } from "react-router-dom";


const Icon = () => {

  return (
    <div className="flex items-center justify-center">
      <Link to="/" className="text-3xl text-cyan-600 font-medium transition-transform duration-500 hover:rotate-12 hover:scale-110">
        URL SHORTENER
      </Link>
    </div>
  );

}


export default Icon;
