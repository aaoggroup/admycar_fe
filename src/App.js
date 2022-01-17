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
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import GlobalCampaign from "./components/Companies/GlobalCampaign/GlobalCampaign";
import SpecificCampaign from "./components/Companies/SpecificCampaign/SpecificCampaign";
import Dashboard from "./components/Companies/Dashboard/Dashboard";
import AllCampaigns from "./components/Companies/AllCampaigns/AllCampaigns";
import StartStreaming from "./components/Promoters/StartStreaming/StartStreaming";
import EditGlobalCampaign from "./components/Companies/EditCampaign/EditGlobalCampaign";
import ProfilePage from "./components/Companies/ProfilePage/ProfilePage";

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
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          {user?.user?.type === "Company" && (
            <Route path="/profile" element={<ProfilePage />} />
          )}
          {user?.user?.type === "Company" && (
            <Route path="/all_campaigns" element={<AllCampaigns />} />
          )}
          {user?.user?.type === "Company" && (
            <Route
              path="/edit_campaign/:campaign_id/"
              element={<EditGlobalCampaign />}
            />
          )}
          {user?.user?.type === "Promoter" && (
            <Route path="/start_streaming" element={<StartStreaming />} />
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
