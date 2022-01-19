import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { Card } from "react-bootstrap";
import { VscNote } from "react-icons/vsc";
import {
  getCampaignsByCompany,
  getSingleCompany,
  controller,
} from "../../../util/api";
import DashboardAllCampaignsRow from "../DashboardAllCampaignsRow/DashboardAllCampaignsRow";
import ActiveCampaignsHeaders from "../ActiveCampaignsHeaders/ActiveCampaignsHeaders";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [companyCampaigns, setCompanyCampaigns] = useState(null);
  const [dashboardCompanyData, setDashboardCompanyData] = useState(null);
  console.log(user);

  useEffect(async () => {
    try {
      const campaigns = await getCampaignsByCompany(user.user.company_id);
      console.log(campaigns);
      setCompanyCampaigns(campaigns);
      const company = await getSingleCompany(user.user.company_id);
      setDashboardCompanyData(company?.data[0]);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  const handleAllCampaignsOpen = () => navigate("/all_campaigns");

  return (
    <div className="d-flex col-12 justify-content-evenly my-5">
      <div className="d-flex col-5 justify-content-center">
        <Card className="dashboard-card-container-right col-10 mt-4 p-4 ms-5 align-items-center">
          <p className="d-flex fs-5 fw-bold">Active Campaigns</p>
          <ActiveCampaignsHeaders />
          {companyCampaigns &&
            companyCampaigns.map((campaign) => (
              <DashboardAllCampaignsRow campaign={campaign} />
            ))}
          <button
            className="d-flex align-items-center justify-content-evenly see-more-btn"
            onClick={handleAllCampaignsOpen}
          >
            <VscNote />
            See More
          </button>
        </Card>
      </div>
      <div className="d-flex col-7 left-dashboard-container justify-content-around">
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
          <p className="d-flex fs-5 fw-bold">Balance</p>$
          {dashboardCompanyData?.balance?.toFixed(2)}
        </Card>
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4">
          <p className="d-flex fs-5 fw-bold">Company Details:</p>
        </Card>
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
          <p className="d-flex fs-5 fw-bold">Today's Spent</p>$
          {companyCampaigns
            ?.reduce((acc, cur) => acc + cur.today_spent, 0)
            .toFixed(2)}{" "}
          / ${companyCampaigns?.reduce((acc, cur) => acc + cur.daily_budget, 0)}
        </Card>
        <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
          <p className="d-flex fs-5 fw-bold">Total Spent</p>$
          {companyCampaigns
            ?.reduce((acc, cur) => acc + cur.total_spent, 0)
            .toFixed(2)}{" "}
          / ${companyCampaigns?.reduce((acc, cur) => acc + cur.total_budget, 0)}
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
