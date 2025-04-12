import React, {useEffect} from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import {AuthProvider} from "./auth/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
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
