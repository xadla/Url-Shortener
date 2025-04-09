import React, { useEffect, useState } from "react";
import CheckUser from "../auth/check";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await CheckUser();
        if (result.data)
          setAuthenticated(result.data.isAuthenticated);
        else setAuthenticated(false);
      } catch (error) {
        console.error("Error checking user:", error);
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <h1 className="text-5xl font-bold text-center">
      {authenticated === null
        ? "Loading..."
        : authenticated
        ? "Hello sir"
        : "Welcome to home page"}
    </h1>
  );
};

export default Home;
