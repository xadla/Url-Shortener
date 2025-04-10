import React, {useEffect} from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import GetCSRF from "./components/GetCSRF";
import CheckAuth from "./components/CheckAuth";
import {AuthProvider} from "./auth/AuthContext";


function App() {

  useEffect(() => {
    GetCSRF();
    CheckAuth();
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      <ToastContainer 
        position="top-left"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
  );
}

export default App;
