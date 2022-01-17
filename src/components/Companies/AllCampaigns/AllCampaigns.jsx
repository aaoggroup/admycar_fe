import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { getCampaignsByCompany } from "../../../util/api";
import SingleCampaignRow from "../SingleCampaignRow/SingleCampaignRow";
import "./all-campaigns.css";
function AllCampaigns() {
  const { user } = useContext(AppContext);
  const [companyCampaigns, setCompanyCampaigns] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsub = async () => {
      const campaigns = await getCampaignsByCompany(user.user.company_id);
      console.log(campaigns);
      setCompanyCampaigns(campaigns);
    };
    unsub();
    return unsub();
  }, []);

  return (
    <div className="d-flex flex-column col-11 my-5 justify-content-center align-items-center all-campaigns-container">
      {companyCampaigns &&
        companyCampaigns.map((campaign) => (
          <SingleCampaignRow campaign={campaign} />
        ))}
    </div>
  );
}

export default AllCampaigns;
