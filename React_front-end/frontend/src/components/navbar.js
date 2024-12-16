import React, { useContext } from "react";
import "./Navbar.css";
import { Navbar, Nav, Container, NavbarToggle, NavbarCollapse } from 'react-bootstrap'; // Import necessary components

import { AuthContext } from "./AuthContext";

const MyNavbar =() =>  {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const handleLogout = () => {
    if (window.confirm("Do you really want to log out?")) {
      logout();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="sm">  {/* "expand" determines the breakpoint */}
      <Container>
        <Navbar.Brand href="/">Apply4u</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" /> {/* Toggle button for mobile */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about-us">About Us</Nav.Link>
            <Nav.Link href="/jobs">Jobs</Nav.Link>
            <Nav.Link href="/admissions">Admissions</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/applied_jobs">Applied jobs</Nav.Link>
                <Nav.Link href="/userprofile">User Profiles</Nav.Link>
            <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
              </>
            ) : (
              <>
              <Nav.Link href="/signup">sign up</Nav.Link>
              <Nav.Link href="/login">login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
