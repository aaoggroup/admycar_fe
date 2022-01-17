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
      BASE_URL + `/campaigns/${properties.company_id}`,
      properties,
      config()
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getCampaignsByCompany = async (company_id) => {
  try {
    const response = await axios.get(
      BASE_URL + `/campaigns/${company_id}`,
      config()
    );
    return response.data.data;
  } catch (err) {
    return err;
  }
};

export const changeCampaignStatus = async (campaign) => {
  console.log(campaign);
  try {
    const response = await axios.put(
      BASE_URL + `/campaigns/${campaign.campaign_id}/${campaign.company_id}`,
      { campaign_status: campaign.campaign_status },
      config()
    );
    console.log(response);
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

export const getAdToStream = async (properties) => {
  try {
    const response = await axios.get(BASE_URL + "/promoters/adtostream", {
      properties,
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const addMoneyToUserBalance = async (properties) => {
  try {
    const response = await axios.put(
      BASE_URL + "/promoters/add_promoter_balance",
      properties,
      config()
    );

    return response.data;
  } catch (err) {
    return err;
  }
};

export const getSingleCampaign = async (props) => {
  console.log(props);
  try {
    const response = await axios.get(
      BASE_URL + `/campaigns/${props.campaign_id}/${props.company_id}`,
      config()
    );
    console.log(response);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const editCampaign = async (campaign) => {
  console.log(campaign);
  try {
    const response = await axios.put(
      BASE_URL + `/campaigns/${campaign.campaign_id}/${campaign.company_id}`,
      campaign,
      config()
    );
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
};

export const chargeCompany = async (properties) => {
  console.log(properties);
  try {
    const response = await axios.put(
      BASE_URL + "/promoters/charge_company",
      properties,
      config()
    );

    return response.data;
  } catch (err) {
    return err;
  }
};
