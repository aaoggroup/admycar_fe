import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { getCampaignsByCompany } from "../../../util/api";
import SingleCampaignRow from "../SingleCampaignRow/SingleCampaignRow";
import "./allcampaigns.css";
function AllCampaigns() {
  const { user } = useContext(AppContext);
  const [companyCampaigns, setCompanyCampaigns] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsub = async () => {
      const campaigns = await getCampaignsByCompany(user.user.company_id);
      setCompanyCampaigns(campaigns.data.data);
    };
    unsub();
    return unsub();
  }, [user]);
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
