import React from 'react'

function AllCampaignsHeaders() {
    return (
      <div className="d-flex col-12 justify-content-between border-bottom text-dark">
        <div className="d-flex col-10 align-items-center">
          <div className="d-flex col-1 justify-content-center">
            <p className="fs-6">
              <b>asset</b>
            </p>
          </div>
          <div className="d-flex col-2 justify-content-center">
            <p className="fs-6">
              <b>Name</b>
            </p>
          </div>
          <div className="d-flex col-1 justify-content-center">
            <p className="fs-6">
              <b>Bid</b>
            </p>
          </div>
          <div className="d-flex col-2 justify-content-center">
            <p className="fs-6">
              <b>Today Spent</b>
            </p>
          </div>
          <div className="d-flex col-2 justify-content-center">
            <p className="fs-6">
              <b>Total Spent</b>
            </p>
          </div>
          <div className="d-flex col-1 justify-content-center">
            <p className="fs-6">
              <b>Area</b>
            </p>
          </div>
          <div className="d-flex col-1 justify-content-center">
            <p className="fs-6">
              <b>Status</b>
            </p>
          </div>
          <div className="d-flex col-2 justify-content-center">
            <p className="fs-6">
              <b>Date Created</b>
            </p>
          </div>
        </div>
      </div>
    );
}

export default AllCampaignsHeaders
