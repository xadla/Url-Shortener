import React from "react";

import useAuth from "../auth/AuthContext";

const Home = () => {

  const { user } = useAuth();

  return (
    <h1 className="text-5xl font-bold text-center">
      Welcome {user ? user.username : "To URL Shortener"}
    </h1>
  );
};

export default Home;
