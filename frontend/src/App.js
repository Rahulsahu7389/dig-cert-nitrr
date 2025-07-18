import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from './context/AuthContext';
import Login from "./components/Login";
import Register from "./components/Registration";
import AdminRegistration from "./components/Admin_of_club";
import EventManagementPage from "./components/EventManagementPage";
import FacultyRegistration from "./components/Faculty";
import Events from "./components/Events";
import HomePage from "./components/HomePage";
import DashboardAdmin from "./components/DashboardAdmin";
import Certificate from "./components/Certificate";
import ForgotPassword from "./components/ForgotPassword";
import GetCertificate from "./components/GetCertificate";
import VerifyCertificate from "./components/VerifyCertificate";
import "./App.css";
// import PrivateRoute from './utils/PrivateRoute';
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ImageCrop from "./components/ImageCrop";

export const LoginContext = createContext();

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [facultyLoggedIn, setFacultyLoggedIn] = useState(false);

  const userLogout = () => {
    localStorage.removeItem("login");
    setUserLoggedIn(false);
    window.location.href = "/Login";
  };

  const facultyLogout = () => {
    localStorage.removeItem("login");
    setFacultyLoggedIn(false);
    window.location.href = "/Login?type=faculty";
  };

  const info = {
    userLoggedIn,
    setUserLoggedIn,
    facultyLoggedIn,
    setFacultyLoggedIn,
    userLogout,
    facultyLogout,
  };

  return (
    <LoginContext.Provider value={info}>
      <Router>
        <div className="App">
          <Navbar />
          <Toaster position="top-center" reverseOrder={true} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/events" element={<Events />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/faculty" element={<FacultyRegistration />} />
            {/* <Route path="/register/admin" element={<AdminRegistration />} /> */}
            <Route path="/Event_management" element={<EventManagementPage />} />
            <Route path="/DashboardAd" element={<DashboardAdmin />} />
            <Route path="/Certificate" element={<Certificate />} />
            <Route path="/table" element={<Table />} />
            <Route path="/getcertificate" element={<GetCertificate />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/crop" element={<ImageCrop />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </LoginContext.Provider>
  );
};

export default App;
