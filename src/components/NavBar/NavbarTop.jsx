import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function NavbarTop() {
  const handleClickAddCampaign = (e) => {
    e.preventDefault();
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Button onClick={handleClickAddCampaign}>Add Campaign</Button>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
