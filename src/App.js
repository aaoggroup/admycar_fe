import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTop from "./components/NavBar/NavbarTop";
import AddCampaign from "./components/Companies/AddCampaign/AddCampaign";
import { useState } from "react";
import { AppContext } from "./context/AppContext";
import SignupPromoter from "./components/Promoters/signupPromoter/SignupPromoter";
import LoginPromoter from "./components/Promoters/loginPromoter/LoginPromoter";

function App() {
  const [isLoginCompanyModal, setIsLoginCompanyModal] = useState(false);
  const [isLoginPromoterModal, setIsLoginPromoterModal] = useState(false);
  const [isSignupPromoterModal, setIsSignupPromoterModal] = useState(false);
  const [isSignupCompanyModal, setIsSignupCompanyModal] = useState(false);
  const [isChangeInUser, setIsChangeInUser] = useState(false);
  const [user, setUser] = useState();

  const values = {
    setIsLoginCompanyModal,
    setIsLoginPromoterModal,
    setIsSignupPromoterModal,
    setIsSignupCompanyModal,
    user,
    setUser,
    setIsChangeInUser,
  };
  return (
    <AppContext.Provider value={values}>
      <NavbarTop />
      <AddCampaign />
      <div className="App">
        <div>Admycar</div>
      </div>
      {isLoginPromoterModal && <LoginPromoter />}
      {isSignupPromoterModal && <SignupPromoter />}
      {/* {isLoginCompanyModal && <LoginPage />}
      {isSignupCompanyModal && <SignupPage />} */}
    </AppContext.Provider>
  );
}

export default App;
