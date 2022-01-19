import React, { useEffect } from "react";
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
// import SpecificCampaign from "./components/Companies/SpecificCampaign/SpecificCampaign";
import Dashboard from "./components/Companies/Dashboard/Dashboard";
import AllCampaigns from "./components/Companies/AllCampaigns/AllCampaigns";
import EditGlobalCampaign from "./components/Companies/EditCampaign/EditGlobalCampaign";
import CompanyProfilePage from "./components/Companies/CompanyProfilePage/CompanyProfilePage";
import StartStreaming from "./components/Promoters/StartStreaming/StartStreaming";
import PromoterProfilePage from "./components/Promoters/PromoterProfilePage/PromoterProfilePage";
import { UserCords } from "./components/Promoters/userCords/UserCords";
import { getSingleCompany, controller } from "./util/api";

function App() {
  const [isLoginCompanyModal, setIsLoginCompanyModal] = useState(false);
  const [isLoginPromoterModal, setIsLoginPromoterModal] = useState(false);
  const [isSignupPromoterModal, setIsSignupPromoterModal] = useState(false);
  const [isSignupCompanyModal, setIsSignupCompanyModal] = useState(false);
  const [isChangeInUser, setIsChangeInUser] = useState(false);
  const [userCords, setUserCords] = useState({ lng: 0.0, lat: 0.0 });
  const [balance, setBalance] = useState(null);
  console.log(userCords);
  let balanceInterval;

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

  useEffect(() => {
    try {
      if (user?.user?.type === "Company") {
        balanceInterval = setInterval(async () => {
          const company = await getSingleCompany(user.user.company_id);
          setBalance(company?.data[0]?.balance);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

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
    userCords,
    setUserCords,
    balance,
    setBalance,
    balanceInterval,
  };
  return (
    <AppContext.Provider value={values}>
      <Router>
        <NavbarTop />
        {user?.user?.type === "Promoter" && <UserCords />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {user?.user?.type === "Company" && (
            <Route path="/add_new_campaign" element={<AddCampaign />} />
          )}
          {user?.user?.type === "Company" && (
            <Route path="/new_global_campaign" element={<GlobalCampaign />} />
          )}
          {/* {user?.user?.type === "Company" && (
            <Route
              path="/new_specific_campaign"
              element={<SpecificCampaign />}
            />
          )} */}
          {user?.user?.type === "Company" && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          {user?.user?.type === "Company" && (
            <Route path="/profile" element={<CompanyProfilePage />} />
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
          {user?.user?.type === "Promoter" && (
            <Route path="/profile" element={<PromoterProfilePage />} />
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
