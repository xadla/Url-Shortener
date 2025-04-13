import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreateUrl from "./pages/CreateUrl";
import Services from "./pages/Services";

import {AuthProvider} from "./auth/AuthContext";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute"; // it's add to links later


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path="/create-url" element={<PrivateRoute><CreateUrl /></PrivateRoute>} />
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
