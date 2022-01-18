import axios from "axios";
const BASE_URL = "https://admycarbe.herokuapp.com";

export let controller;
//  controller = new AbortController();
// {
//   signal: controller.signal;
// }

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
  controller = new AbortController();
  try {
    const response = await axios.get(
      BASE_URL + `/campaigns/${company_id}`,
      config(),
      {
        signal: controller.signal,
      }
    );
    return response.data.data;
  } catch (err) {
    return err;
  }
};

export const changeCampaignStatus = async (campaign) => {
  try {
    const response = await axios.put(
      BASE_URL + `/campaigns/${campaign.campaign_id}/${campaign.company_id}`,
      { campaign_status: campaign.campaign_status },
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
    localStorage.setItem("token", response.data.token);
    return response.data.payload;
  } catch (err) {
    return err;
  }
};

export const getAdToStream = async (properties) => {
  try {
    const response = await axios.get(BASE_URL + "/promoters/adtostream", {
      params: JSON.stringify(properties),
    });
    console.log(response);
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
  controller = new AbortController();
  try {
    const response = await axios.get(
      BASE_URL + `/campaigns/${props.campaign_id}/${props.company_id}`,
      config(),
      {
        signal: controller.signal,
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const editCampaign = async (campaign) => {
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

export const getSingleCompany = async (id) => {
  controller = new AbortController();
  try {
    const response = await axios.get(BASE_URL + `/companies/${id}`, config(), {
      signal: controller.signal,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getSinglePromoter = async (id) => {
  controller = new AbortController();
  try {
    const response = await axios.get(BASE_URL + `/promoters/${id}`, config(), {
      signal: controller.signal,
    });
    return response.data.data;
  } catch (err) {
    return err;
  }
};
