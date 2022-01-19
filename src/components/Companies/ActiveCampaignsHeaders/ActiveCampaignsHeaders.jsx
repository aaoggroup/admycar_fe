import React from "react";

function ActiveCampaignsHeaders() {
  return (
    <div className="d-flex col-12 justify-content-between border-bottom text-dark">
      <div className="d-flex col-12 align-items-center">
        <div className="d-flex col-2 justify-content-center">
          <p className="fs-6">
            <b>asset</b>
          </p>
        </div>
        <div className="d-flex col-5 justify-content-center">
          <p className="fs-6">
            <b>Name</b>
          </p>
        </div>
        <div className="d-flex col-2 justify-content-center">
          <p className="fs-6">
            <b>Bid</b>
          </p>
        </div>
        <div className="d-flex col-3 justify-content-center">
          <p className="fs-6">
            <b>Today Spent</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ActiveCampaignsHeaders;
