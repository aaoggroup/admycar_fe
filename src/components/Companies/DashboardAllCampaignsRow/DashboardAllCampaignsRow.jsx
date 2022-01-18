import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import "./dashboard-all-campaigns-row.css";

function DashboardAllCampaignsRow(props) {
  const { campaign } = props;

  console.log(campaign);

  const { user } = useContext(AppContext);

  console.log(user.user.company_id);

  const checkStatusForColor = () => {
    if (campaign.campaign_status === "Active")
      return "status-small-circle text-dark bg-success";
  };

  return (
    <div className="d-flex col-12 justify-content-between text-dark">
      {campaign.campaign_status === "Active" && (
        <div className="d-flex col-12 align-items-center mb-2">
          <div className="status-small-circle-container">
            <div className={checkStatusForColor()}></div>
          </div>
          {campaign.asset ? (
            <img
              className="campaign-small-image"
              src={campaign.asset}
              alt="Campaign"
            />
          ) : (
            <img
              className="campaign-small-image"
              src="/images/global.png"
              alt="Campaign"
            />
          )}
          <p className="fs-6 p-0 my-0 mx-2">{campaign.campaign_name}</p>
          <p className="fs-6 p-0 my-0 mx-2">
            <b>Bid:</b> ${campaign.current_bid}
          </p>
          <p className="fs-6 p-0 my-0 mx-2">
            <b>Today Spent:</b> ${campaign.today_spent} / $
            {campaign.daily_budget}
          </p>
        </div>
      )}
    </div>
  );
}

export default DashboardAllCampaignsRow;
