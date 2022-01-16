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
      setCompanyCampaigns(campaigns);
    };
    unsub();
    return unsub();
  }, []);

  return (
    <div className="all-campaigns-wrapper">
      {companyCampaigns &&
        companyCampaigns.map((campaign) => (
          <SingleCampaignRow campaign={campaign} />
        ))}
    </div>
  );
}

export default AllCampaigns;
