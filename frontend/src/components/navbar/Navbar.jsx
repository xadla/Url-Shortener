import React from "react";


import Icon from "./Icon";
import Content from "./Content";
import Sign from "./Sign";


function Navbar() {
  return (

    <nav className="grid grid-cols-[1fr_3fr_1fr] gap-4 p-10 bg-[#FFF4EA] shadow-gray-300 m-10 rounded-2xl">
      <Icon />
      <Content />
      <Sign />
    </nav>

  );
}

export default Navbar;
