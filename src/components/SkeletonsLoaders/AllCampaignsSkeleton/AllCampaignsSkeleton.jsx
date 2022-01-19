import React from "react";
import "./all-campaigns-skeleton.css";

function AllCampaignsSkeleton() {
  return (
    <>
      <div className="d-flex flex-column col-12 my-3">
        <div className="d-flex justify-content-around align-items-center my-2">
          <div className="campaign-asset-skeleton" />
          <div className="campaign-row-skeleton rounded col-9" />
          <div className="campaign-btn-skeleton rounded col-2" />
        </div>
        <div className="d-flex justify-content-around align-items-center my-2">
          <div className="campaign-asset-skeleton" />
          <div className="campaign-row-skeleton rounded col-9" />
          <div className="campaign-btn-skeleton rounded col-2" />
        </div>
        <div className="d-flex justify-content-around align-items-center my-2">
          <div className="campaign-asset-skeleton" />
          <div className="campaign-row-skeleton rounded col-9" />
          <div className="campaign-btn-skeleton rounded col-2" />
        </div>
      </div>
    </>
  );
}

export default AllCampaignsSkeleton;
