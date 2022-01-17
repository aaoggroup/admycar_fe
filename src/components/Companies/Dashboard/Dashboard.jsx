import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { getCampaignsByCompany, getSingleCompany } from "../../../util/api";

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
    <>
      <div>
        <button onClick={handleAllCampaignsOpen}>all campaigns</button>
      </div>
      {companyCampaigns && (
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
      )}
    </>
  );
}

export default Dashboard;
