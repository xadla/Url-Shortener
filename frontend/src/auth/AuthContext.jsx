import { createContext, useContext, useState, useEffect } from "react";

import Login from "./Login";
import Logout from "./Logout";
import GetCSRF from "../components/GetCSRF";
import CheckAuth from "../components/CheckAuth";
import Signup from "./Signup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const checkLogin = async () => {
      await GetCSRF();
      const loggedInUser = await CheckAuth();
      setUser(loggedInUser);
    };
    checkLogin();
    // should be customize for loading
  }, []);

  async function login(username, password) {
    try {
      const result = await Login(username, password);
      setUser(result.data.user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      const result = await Logout();
      setUser(null);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function signup(full_name, username, password, password2) {
    try {
      const result = await Signup(full_name, username, password, password2);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );

}

export default function useAuth() {
  return useContext(AuthContext);
}
