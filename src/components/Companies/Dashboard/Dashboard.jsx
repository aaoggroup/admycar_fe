import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { Card } from "react-bootstrap";
import { getCampaignsByCompany, getSingleCompany } from "../../../util/api";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [companyCampaigns, setCompanyCampaigns] = useState(null);
  const [balance, setBalance] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsub = async () => {
      const campaigns = await getCampaignsByCompany(user.user.company_id);
      console.log(campaigns);
      setCompanyCampaigns(campaigns);
      const company = await getSingleCompany(user.user.company_id);
      setBalance(company.data[0].balance);
    };
    unsub();
    return unsub();
  }, []);

  const handleAllCampaignsOpen = () => navigate("/all_campaigns");

  return (
    <div className="d-flex col-12 justify-content-evenly">
      <div className="d-flex col-8 left-dashboard-container">
        <Card className="dashboard-card-container col-3 mt-4 p-4">
          <p className="d-flex fs-5 fw-bold">Company Details:</p>
        </Card>
        <Card className="dashboard-card-container col-3 mt-4 p-4">
          <p className="d-flex fs-5 fw-bold">Company Details:</p>
        </Card>
        <Card className="dashboard-card-container col-3 mt-4 p-4">
          <p className="d-flex fs-5 fw-bold">Company Details:</p>
        </Card>
        <Card className="dashboard-card-container col-3 mt-4 p-4">
          <p className="d-flex fs-5 fw-bold">Company Details:</p>
        </Card>
      </div>
      <div className="d-flex col-4">
        <Card className="dashboard-card-container col-3 mt-4 p-4">
          <p className="d-flex fs-5 fw-bold">Company Details:</p>
        </Card>
      </div>
      {/* <div>
        <button onClick={handleAllCampaignsOpen}>all campaigns</button>
      </div> */}
      {/* {companyCampaigns && (
        <>
          (
          <div className="text-black">
            Today's Spent $
            {companyCampaigns.reduce((acc, cur) => acc + cur.today_spent, 0)} /
            ${companyCampaigns.reduce((acc, cur) => acc + cur.daily_budget, 0)}
          </div>
          <div className="text-black">
            Total Spent $
            {companyCampaigns.reduce((acc, cur) => acc + cur.total_spent, 0)} /
            ${companyCampaigns.reduce((acc, cur) => acc + cur.total_budget, 0)}
          </div>
          <div className="text-black">
            Active Campaigns
            {
              companyCampaigns.filter(
                (camp) => camp.campaign_status === "Active"
              ).length
            }
          </div>
          <div className="text-black">Balance: ${balance}</div>)
        </>
      )} */}
    </div>
  );
}

export default Dashboard;
