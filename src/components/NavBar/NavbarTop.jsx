import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";

function NavbarTop() {
  const {
    setIsSignupCompanyModal,
    setIsLoginCompanyModal,
    setIsLoginPromoterModal,
    setIsSignupPromoterModal,
  } = useContext(AppContext);
  const handleLoginPromoter = (e) => {
    e.preventDefault();
    setIsLoginPromoterModal((pre) => !pre);
  };

  const handleSignupPromoter = (e) => {
    e.preventDefault();
    setIsSignupPromoterModal((pre) => !pre);
  };

  const handleLoginCompany = (e) => {
    e.preventDefault();
    setIsLoginCompanyModal((pre) => !pre);
  };

  const handleSignupCompany = (e) => {
    e.preventDefault();
    setIsSignupCompanyModal((pre) => !pre);
  };

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
        <Button onClick={handleLoginPromoter}>Login Promoter</Button>
        <Button onClick={handleSignupPromoter}>Signup Promoter</Button>
        <Button onClick={handleLoginCompany}>Login Company</Button>
        <Button onClick={handleSignupCompany}>Signup Company</Button>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
