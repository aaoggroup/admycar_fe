import axios from "axios";
const BASE_URL = "http://localhost:5000";

const config = () => {
  if (localStorage.getItem("token")) {
    return {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
  }
};

export const addCampaign = async (properties) => {
  try {
    const response = await axios.post(
      BASE_URL + "/companies/addcampaign",
      properties,
      config()
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const signUpPromoter = async (newPromoter) => {
  try {
    const response = await axios.post(
      BASE_URL + "/promoters/signup",
      newPromoter
    );
    localStorage.setItem("token", response.data.token);
    console.log(response);
    return response.data.payload;
  } catch (err) {
    return err;
  }
};

export const loginPromoter = async (promoterDetails) => {
  try {
    const response = await axios.post(
      BASE_URL + "/promoters/login",
      promoterDetails
    );
    localStorage.setItem("token", response.data.token);
    console.log(response.data.payload.user);
    return response.data.payload;
  } catch (err) {
    return err;
  }
};

export const signUpCompany = async (newCompany) => {
  try {
    const response = await axios.post(
      BASE_URL + "/companies/signup",
      newCompany
    );
    localStorage.setItem("token", response.data.token);
    return response.data.payload;
  } catch (err) {
    return err;
  }
};

export const loginCompany = async (companyDetails) => {
  try {
    const response = await axios.post(
      BASE_URL + "/companies/login",
      companyDetails
    );
    console.log(response.data.token);
    localStorage.setItem("token", response.data.token);
    return response.data.payload;
  } catch (err) {
    return err;
  }
};
