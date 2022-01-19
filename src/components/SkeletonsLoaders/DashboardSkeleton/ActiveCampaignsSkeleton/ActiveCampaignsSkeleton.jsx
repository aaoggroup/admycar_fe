import React from "react";
import "./active-campaigns-skeleton.css";

function ActiveCampaignsSkeleton() {
  return (
    <>
      <div className="d-flex flex-column  col-12 my-3">
        <div className="d-flex justify-content-around align-items-center my-2">
          <div className="active-campaign-asset-skeleton" />
          <div className="active-campaign-row-skeleton rounded col-9" />
        </div>
        <div className="d-flex justify-content-around align-items-center my-2">
          <div className="active-campaign-asset-skeleton" />
          <div className="active-campaign-row-skeleton rounded col-9" />
        </div>
        <div className="d-flex justify-content-around align-items-center my-2">
          <div className="active-campaign-asset-skeleton" />
          <div className="active-campaign-row-skeleton rounded col-9" />
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className="active-campaign-btn-skeleton rounded col-3" />
        </div>
      </div>
    </>
  );
}

export default ActiveCampaignsSkeleton;
