import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { getCampaignsByCompany, controller } from "../../../util/api";
import SingleCampaignRow from "../SingleCampaignRow/SingleCampaignRow";
import AllCampaignsHeaders from "../AllCampaignsHeaders/AllCampaignsHeaders";
import "./all-campaigns.css";
import AllCampaignsSkeleton from "../../SkeletonsLoaders/AllCampaignsSkeleton/AllCampaignsSkeleton";

function AllCampaigns() {
  const { user } = useContext(AppContext);
  const [companyCampaigns, setCompanyCampaigns] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);

  useEffect(async () => {
    setIsLoading((prev) => !prev);
    try {
      const campaigns = await getCampaignsByCompany(user.user.company_id);
      console.log(campaigns);
      setCompanyCampaigns(campaigns);
      setIsLoading((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <h1 className="display-6 mt-5">Manage Campaigns</h1>
      <div className="d-flex flex-column col-11 my-5 justify-content-center align-items-center all-campaigns-container">
        <AllCampaignsHeaders />
        {isLoading && <AllCampaignsSkeleton />}
        {!isLoading &&
          companyCampaigns &&
          companyCampaigns.map((campaign) => (
            <SingleCampaignRow campaign={campaign} />
          ))}
      </div>
    </>
  );
}

export default AllCampaigns;
