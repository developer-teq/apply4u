import React from "react";
import "./Navbar.css";
import { Navbar, Nav, Container, NavbarToggle, NavbarCollapse } from 'react-bootstrap'; // Import necessary components

const MyNavbar = () => {
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
            <Nav.Link href="/applied-jobs">Applied jobs</Nav.Link>
            <Nav.Link href="/admissions">Admissions</Nav.Link>
            <Nav.Link href="/userprofile">User Profiles</Nav.Link>
            <Nav.Link href="/add_balance">Add balance</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
