import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleAllCampaignsOpen = () => navigate("/all_campaigns");

  return (
    <div>
      <button onClick={handleAllCampaignsOpen}>all campaigns</button>
    </div>
  );
}

export default Dashboard;
