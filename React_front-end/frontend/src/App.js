
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import React, { useState, useEffect } from "react";

import Navbar from './components/navbar';
// import Header from './components/header';
// import Sidebar from './components/sidebar';
// import MainContent from './components/main';
// import Footer from './components/footer';
import HomePage from './pages/HomePage';  // Import the HomePage component

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import AboutPage from './pages/AboutPage';  // Assuming AboutPage.js exists
import JobPage from './pages/Jobs';
import AdmissionPage from './pages/admissions';
import JobDetailsPage from './pages/JobDetailsPage';
import ApplyjobPage from './pages/ApplyjobPage';
import UserProfileForm from './pages/UserProfile';
import AppliedJobDetail from './pages/AppliedJobs';
import Login from './components/forms_components/LoginForm';
import Signup from './components/forms_components/SignUpForm';
import { AuthProvider } from "./components/AuthContext";


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when the app loads
  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token); // Convert token to boolean
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you really want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setIsLoggedIn(false);
    }
  };
  return (
    <AuthProvider>
    <Router>
    <div className="container-fluid">
      <Navbar  isLoggedIn={isLoggedIn} onLogout={handleLogout}  />
      <div className="row">
        {/* <Sidebar /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/admissions" element={<AdmissionPage />} />
            <Route path="/userprofile" element={<UserProfileForm />} />
            <Route path="/applied_jobs" element={<AppliedJobDetail/>} />
            <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
            <Route path="/apply" element={<ApplyjobPage />} />
            
          </Routes>
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3">
    
        <p>Apply4u.online  - &copy; 2024 apply for you</p>
      </footer>
    </div>
  </Router>
  </AuthProvider>
  );
}
export default App;
