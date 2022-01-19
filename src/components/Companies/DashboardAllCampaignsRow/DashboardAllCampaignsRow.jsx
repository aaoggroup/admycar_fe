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
    <div className="d-flex col-12 justify-content-between border-bottom text-dark">
      {campaign.campaign_status === "Active" && (
        <div className="d-flex col-12 align-items-center mb-2">
          {/* <div className="status-small-circle-container"></div> */}
          <div className="d-flex col-2 mt-2 justify-content-center">
            <div className={checkStatusForColor()}></div>
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
          </div>
          <div className="d-flex col-5 mt-2 justify-content-center">
            <p className="fs-6 m-0">{campaign.campaign_name}</p>
          </div>
          <div className="d-flex col-2 mt-2 justify-content-center">
            <p className="fs-6 m-0">${campaign.current_bid}</p>
          </div>
          <div className="d-flex col-3 mt-2 justify-content-center">
            <p className="fs-6 m-0">
              ${campaign.today_spent.toFixed(2)} / ${campaign.daily_budget}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardAllCampaignsRow;
