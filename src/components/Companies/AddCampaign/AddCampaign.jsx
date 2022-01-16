import React from "react";
import { useNavigate } from "react-router-dom";
import "./add-campaign.css";

function AddCampaign() {
  const navigate = useNavigate();

  const handleGlobalCampaignOpen = () => navigate("/new_global_campaign");

  const handleSpecificCampaignOpen = () => navigate("/new_specific_campaign");

  return (
    <div className="d-flex col-12 justify-content-center mt-5">
      <div className="d-flex col-8 justify-content-between align-items-center">
        <div className="d-flex flex-column col-4 align-items-center display-6 fw-bold mb-3">
          <p>Global Campaign</p>
          <button
            className="choose-campaign-btn rounded col-12"
            onClick={handleGlobalCampaignOpen}
          >
            <img
              className="choose-campaign-img rounded"
              src="images/global.png"
              alt="Global"
            />
          </button>
        </div>
        <div className="d-flex flex-column col-4 align-items-center display-6 fw-bold mb-3">
          <p>Specific Campaign</p>
          <button
            className="choose-campaign-btn rounded col-12"
            onClick={handleSpecificCampaignOpen}
          >
            <img
              className="choose-campaign-img rounded"
              src="images/specific.png"
              alt="Specific"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCampaign;
