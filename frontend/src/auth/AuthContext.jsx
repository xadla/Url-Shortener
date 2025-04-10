import { createContext, useContext, useState } from "react";

import Login from "./Login";
import Logout from "./Logout";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export default function useAuth() {
  return useContext(AuthContext);
}
