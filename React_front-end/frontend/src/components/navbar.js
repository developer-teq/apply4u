import React from "react";
import "./Navbar.css";
import { Navbar, Nav, Container } from 'react-bootstrap'; // Import React Bootstrap components

const MyNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">Apply4u</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about-us">About-us</Nav.Link>
        <Nav.Link href="/jobs">jobs</Nav.Link>
        <Nav.Link href="/admissions">admissions</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
};

export default MyNavbar;
