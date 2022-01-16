import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarTop from "./components/NavbarTop/NavbarTop";
import AddCampaign from "./components/Companies/AddCampaign/AddCampaign";
import { useState } from "react";
import { AppContext } from "./context/AppContext";
import SignupPromoter from "./components/Promoters/signupPromoter/SignupPromoter";
import LoginPromoter from "./components/Promoters/loginPromoter/LoginPromoter";
import SignupCompany from "./components/Companies/signupCompany/SignupCompany";
import LoginCompany from "./components/Companies/loginCompany/LoginCompany";
import { loginCompany, signUpCompany } from "./util/api";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import GlobalCampaign from "./components/Companies/GlobalCampaign/GlobalCampaign";
import SpecificCampaign from "./components/Companies/SpecificCampaign/SpecificCampaign";
import AllCampaigns from "./components/Companies/AllCampaigns/AllCampaigns";

function App() {
  const [isLoginCompanyModal, setIsLoginCompanyModal] = useState(false);
  const [isLoginPromoterModal, setIsLoginPromoterModal] = useState(false);
  const [isSignupPromoterModal, setIsSignupPromoterModal] = useState(false);
  const [isSignupCompanyModal, setIsSignupCompanyModal] = useState(false);
  const [isChangeInUser, setIsChangeInUser] = useState(false);

  const checkIfUserSignedIn = () => {
    try {
      console.log(
        JSON.parse(atob(localStorage.getItem("token").split(".")[1]))
      );
      return JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const [user, setUser] = useState(checkIfUserSignedIn());

  const values = {
    setIsLoginCompanyModal,
    setIsLoginPromoterModal,
    setIsSignupPromoterModal,
    setIsSignupCompanyModal,
    user,
    setUser,
    setIsChangeInUser,
    isLoginPromoterModal,
    isLoginCompanyModal,
    isSignupPromoterModal,
    isSignupCompanyModal,
  };
  return (
    <AppContext.Provider value={values}>
      <Router>
        <NavbarTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {user?.user?.type === "Company" && (
            <Route path="/add_new_campaign" element={<AddCampaign />} />
          )}
          {user?.user?.type === "Company" && (
            <Route path="/new_global_campaign" element={<GlobalCampaign />} />
          )}
          {user?.user?.type === "Company" && (
            <Route
              path="/new_specific_campaign"
              element={<SpecificCampaign />}
            />
          )}
          {user?.user?.type === "Company" && (
            <Route path="/all_campaigns" element={<AllCampaigns />} />
          )}
        </Routes>
        {isLoginPromoterModal && <LoginPromoter />}
        {isSignupPromoterModal && <SignupPromoter />}
        {isLoginCompanyModal && <LoginCompany />}
        {isSignupCompanyModal && <SignupCompany />}
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
