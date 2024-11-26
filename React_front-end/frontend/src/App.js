
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

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
import CashoutForm from './components/forms_components/CashInOutForm';
import AppliedJobDetail from './pages/AppliedJobs';
function App() {
  return (
    <Router>
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        {/* <Sidebar /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/admissions" element={<AdmissionPage />} />
            <Route path="/userprofile" element={<UserProfileForm />} />
            <Route path="/add_balance" element={<CashoutForm />} />
            <Route path="/applied-jobs" element={<AppliedJobDetail/>} />
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
  );
}
export default App;
