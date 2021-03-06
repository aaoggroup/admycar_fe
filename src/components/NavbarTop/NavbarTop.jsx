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
import { VscSignOut } from "react-icons/vsc";
import { RiTaxiWifiFill } from "react-icons/ri";
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
    balance,
    balanceInterval,
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
    clearInterval(balanceInterval);
    navigate("/");
  };

  return (
    <Navbar
      className="d-flex col-12 navbar-container justify-content-between align-items-center p-2"
      bg="dark"
      variant="dark"
    >
      <Container>
        <div className="d-flex col-4 align-items-center">
          <Link
            to="/"
            className="d-flex text-decoration-none me-3 text-light fs-4 align-items-center"
          >
            <RiTaxiWifiFill className="me-2" />
            AdMyCar
          </Link>
          {user?.user?.type === "Company" && (
            <div className="d-flex col-12">
              <Link
                to="dashboard"
                className="d-flex text-decoration-none me-3 text-light"
              >
                Dashboard
              </Link>
              <Link
                to="profile"
                className="d-flex text-decoration-none text-light"
              >
                Profile
              </Link>
            </div>
          )}
          {user?.user?.type === "Promoter" && (
            <div className="d-flex col-12">
              <Link
                to="start_streaming"
                className="d-flex text-decoration-none me-3 text-light"
              >
                Streaming
              </Link>
              <Link
                to="profile"
                className="d-flex text-decoration-none text-light"
              >
                Profile
              </Link>
            </div>
          )}
        </div>
        <div className="d-flex col-4 justify-content-center align-items-center">
          {user?.user?.type === "Company" && (
            <Button
              className="add-campaign-btn col-6 align-items-center"
              onClick={handleAddNewCampaignClick}
            >
              <BsPlus className="pb-1" />
              Launch New Campaign
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
        {user?.user?.type && (
          <div className="d-flex col-4 justify-content-end align-items-center">
            {user.user.type === "Company" && (
              <b className="text-success">${balance?.toFixed(2)}</b>
            )}
            <button
              className="nav-logout-btn align-items-center"
              onClick={handleLogoutClick}
            >
              <VscSignOut className="nav-logout-icon me-2 mb-1" />
              Log Out
            </button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
