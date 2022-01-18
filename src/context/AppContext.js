import { createContext } from "react";

export const AppContext = createContext({
  isLoginModal: null,
  setIsLoginModal: () => {},
  setIsSignupModal: () => {},
  isSignupModal: null,
  user: null,
  setUser: () => {},
  checkIfUserSignedIn: () => {},
  setIsChangeInUser: () => {},
  userCords: {},
  setUserCords: () => {},
});
