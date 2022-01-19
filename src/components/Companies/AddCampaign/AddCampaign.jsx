import React from "react";
import { useNavigate } from "react-router-dom";
import "./add-campaign.css";

function AddCampaign() {
  const navigate = useNavigate();

  const handleGlobalCampaignOpen = () => navigate("/new_global_campaign");

  // const handleSpecificCampaignOpen = () => navigate("/new_specific_campaign");

  return (
    <div className="d-flex col-12 justify-content-center my-5">
      <div className="d-flex col-8 justify-content-between align-items-center">
        <div className="d-flex flex-column col-4 align-items-center display-6 fw-bold mb-3">
          <h1 className="display-6 mb-4">Global Campaign</h1>
          <button
            className="choose-global-campaign-btn col-12"
            onClick={handleGlobalCampaignOpen}
          >
            <img
              className="choose-global-campaign-img"
              src="images/global.png"
              alt="Global"
            />
          </button>
        </div>
        <div className="d-flex flex-column col-4 align-items-center display-6 fw-bold mb-3">
          <h1 className="display-6 mb-4">Specific Campaign</h1>
          <div className="coming-soon-container col-12">
            <img
              className="coming-soon-img"
              src="images/specific_ coming_soon.png"
              alt="Specific"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCampaign;
