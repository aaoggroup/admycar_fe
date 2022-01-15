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
