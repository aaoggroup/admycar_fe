import React from "react";
import { Card } from "react-bootstrap";
import ActiveCampaignsHeaders from "../../Companies/ActiveCampaignsHeaders/ActiveCampaignsHeaders";
import ActiveCampaignsSkeleton from "./ActiveCampaignsSkeleton/ActiveCampaignsSkeleton";
import BalanceSkeleton from "./BalanceSkeleton/BalanceSkeleton";
import GoToProfileSkeleton from "./GoToProfileSkeleton/GoToProfileSkeleton";
import TodaysSpent from "./TodaysSpent/TodaysSpent";
import TotalSpentSkeleton from "./TotalSpentSkeleton/TotalSpentSkeleton";

function DashboardSkeleton() {
  return (
    <div className="d-flex col-12 justify-content-evenly my-5">
      <div className="d-flex col-5 justify-content-center">
        <Card className="dashboard-card-container-right col-10 mt-4 p-4 ms-5 align-items-center">
          <p className="d-flex fs-5 fw-bold">Active Campaigns</p>
          <ActiveCampaignsHeaders />
          <ActiveCampaignsSkeleton />
        </Card>
      </div>
      <div className="d-flex col-7 left-dashboard-container justify-content-around">
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
          <p className="d-flex fs-5 fw-bold">Your Balance</p>
          <div className="d-flex col-12 justify-content-center flex-grow-1 align-items-center">
            <BalanceSkeleton />
          </div>
        </Card>
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
          <p className="d-flex fs-5 fw-bold">Go To Your Profile</p>
          <GoToProfileSkeleton />
        </Card>
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
          <p className="d-flex fs-5 fw-bold">Today's Spent</p>
          <div className="d-flex col-12 justify-content-center flex-grow-1 align-items-center">
            <TodaysSpent />
          </div>
        </Card>
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
          <p className="d-flex fs-5 fw-bold">Total Spent</p>
          <div className="d-flex col-12 justify-content-center flex-grow-1 align-items-center">
            <TotalSpentSkeleton />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
