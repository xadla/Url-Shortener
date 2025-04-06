import React, { useEffect } from "react";

import CheckUser from "../auth/check";

const Home = () => {
  const authenticated = ""
  useEffect (async () => {
    const result = await CheckUser();
    authenticated = result.data.isAuthenticated;
  }, []);
  
  return <h1 className="text-5xl font-bold text-center">
    { authenticated ? "Hello sir": "Welcome to home page" }
  </h1>;
};

export default Home;
