import axios from "axios";
const BASE_URL = "http://localhost:5000";

export const addCampaign = async (properties) => {
  try {
    const response = axios.post(
      BASE_URL + "/companies/addcampaign",
      properties
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const signUpPromoter = async (newPromoter) => {
  try {
    const response = axios.post(BASE_URL + "/promoters/signup", newPromoter);
    return response;
  } catch (err) {
    return err;
  }
};

export const loginPromoter = async (promoterDetails) => {
  try {
    const response = axios.post(BASE_URL + "/promoters/login", promoterDetails);
    return response;
  } catch (err) {
    return err;
  }
};

export const signUpCompany = async (newCompany) => {
  try {
    const response = axios.post(BASE_URL + "/companies/signup", newCompany);
    return response;
  } catch (err) {
    return err;
  }
};

export const loginCompany = async (companyDetails) => {
  try {
    const response = axios.post(BASE_URL + "/companies/login", companyDetails);
    return response;
  } catch (err) {
    return err;
  }
};
