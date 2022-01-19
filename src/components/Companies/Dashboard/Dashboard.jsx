import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { Card } from "react-bootstrap";
import { VscNote } from "react-icons/vsc";
import { MdAddCircleOutline } from "react-icons/md";
import {
  getCampaignsByCompany,
  getSingleCompany,
  controller,
} from "../../../util/api";
import DashboardAllCampaignsRow from "../DashboardAllCampaignsRow/DashboardAllCampaignsRow";
import ActiveCampaignsHeaders from "../ActiveCampaignsHeaders/ActiveCampaignsHeaders";
import "./dashboard.css";
import DashboardSkeleton from "../../SkeletonsLoaders/DashboardSkeleton/DashboardSkeleton";

function Dashboard() {
  const navigate = useNavigate();
  const { user, balance } = useContext(AppContext);
  const [companyCampaigns, setCompanyCampaigns] = useState(null);
  const [dashboardCompanyData, setDashboardCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  useEffect(async () => {
    setIsLoading((prev) => !prev);
    try {
      const campaigns = await getCampaignsByCompany(user.user.company_id);
      console.log(campaigns);
      setCompanyCampaigns(campaigns);
      const company = await getSingleCompany(user.user.company_id);
      setDashboardCompanyData(company?.data[0]);
      setIsLoading((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  const handleAllCampaignsOpen = () => navigate("/all_campaigns");

  return (
    <>
      {isLoading && <DashboardSkeleton />}
      {!isLoading && (
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
                className="d-flex align-items-center justify-content-evenly see-more-btn mt-3"
                onClick={handleAllCampaignsOpen}
              >
                <VscNote />
                See More
              </button>
            </Card>
          </div>
          <div className="d-flex col-7 left-dashboard-container justify-content-around">
            <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
              <p className="d-flex fs-5 fw-bold">Your Balance</p>
              <div className="d-flex col-12 justify-content-center flex-grow-1 align-items-center">
                <h1 className="fs-1">${balance?.toFixed(2)}</h1>
              </div>
            </Card>
            <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
              <p className="d-flex fs-5 fw-bold">Go To Your Profile</p>
              <div className="d-flex col-12 justify-content-center flex-grow-1 align-items-center">
                <div className="dashboard-add-img-small-btn-container">
                  <MdAddCircleOutline className="dashboard-add-img-small-btn" />
                </div>
                <img
                  className="dashboard-company-profile-image"
                  src="/images/company_profile_placeholder_image.png"
                  alt="Company Profile"
                />
              </div>
            </Card>
            <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
              <p className="d-flex fs-5 fw-bold">Today's Spent</p>
              <div className="d-flex col-12 justify-content-center flex-grow-1 align-items-center">
                <h1 className="fs-1">
                  $
                  {companyCampaigns
                    ?.reduce((acc, cur) => acc + cur.today_spent, 0)
                    .toFixed(2)}{" "}
                  /
                </h1>
                <h1 className="fs-5">
                  $
                  {companyCampaigns?.reduce(
                    (acc, cur) => acc + cur.daily_budget,
                    0
                  )}
                </h1>
              </div>
            </Card>
            <Card className="dashboard-card-container col-5 mt-4 mx-4 p-4 align-items-center">
              <p className="d-flex fs-5 fw-bold">Total Spent</p>
              <div className="d-flex col-12 justify-content-center flex-grow-1 align-items-center">
                <h1 className="fs-1">
                  $
                  {companyCampaigns
                    ?.reduce((acc, cur) => acc + cur.total_spent, 0)
                    .toFixed(2)}{" "}
                  /
                </h1>
                <h1 className="fs-5">
                  $
                  {companyCampaigns?.reduce(
                    (acc, cur) => acc + cur.total_budget,
                    0
                  )}
                </h1>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
