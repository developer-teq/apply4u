
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

import Navbar from './components/navbar';
// import Header from './components/header';
import Sidebar from './components/sidebar';
// import MainContent from './components/main';
// import Footer from './components/footer';
import HomePage from './HomePage';  // Import the HomePage component

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import AboutPage from './AboutPage';  // Assuming AboutPage.js exists


function App() {
  return (
    <Router>
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="col-9">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
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
