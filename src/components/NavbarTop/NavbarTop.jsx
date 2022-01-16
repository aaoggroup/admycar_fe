import React, { useContext } from "react";
import {
  Navbar,
  Container,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "./navbar-top.css";
import { BsPlus } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function NavbarTop() {
  const {
    user,
    setUser,
    setIsSignupCompanyModal,
    setIsLoginCompanyModal,
    setIsLoginPromoterModal,
    setIsSignupPromoterModal,
  } = useContext(AppContext);

  const navigate = useNavigate();

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

  const handleAddNewCampaignClick = () => navigate("/add_new_campaign");

  const handleLogoutClick = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar
      className="d-flex col-12 justify-content-between align-items-center p-2"
      bg="dark"
      variant="dark"
    >
      <Container>
        <div className="d-flex col-4 align-items-center">
          <Link
            to="/"
            className="d-flex text-decoration-none me-3 text-light fs-4"
          >
            AdMyCar
          </Link>
          <Link
            to="features"
            className="d-flex text-decoration-none me-3 text-light"
          >
            Features
          </Link>
          <Link to="pricing" className="d-flex text-decoration-none text-light">
            Pricing
          </Link>
        </div>
        <div className="d-flex col-4 justify-content-center align-items-center">
          {user?.user.type === "Company" && (
            <Button
              className="add-campaign-btn col-6 align-items-center"
              onClick={handleAddNewCampaignClick}
            >
              <BsPlus className="pb-1" />
              Add New Campaign
            </Button>
          )}
        </div>
        {!user && (
          <div className="d-flex col-4 justify-content-end">
            <DropdownButton
              variant="light"
              className="dropdown-btn rounded me-4"
              id="dropdown-basic-button"
              title="Login"
            >
              <Dropdown.Item as="button" onClick={handleLoginPromoter}>
                As Promoter
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleLoginCompany}>
                As Company
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="light"
              className="dropdown-btn rounded"
              id="dropdown-basic-button"
              title="Signup"
            >
              <Dropdown.Item as="button" onClick={handleSignupPromoter}>
                As Promoter
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleSignupCompany}>
                As Company
              </Dropdown.Item>
            </DropdownButton>
          </div>
        )}
        {user && (
          <Button
            className="add-campaign-btn col-2 align-items-center"
            onClick={handleLogoutClick}
          >
            <BsPlus className="pb-1" />
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
