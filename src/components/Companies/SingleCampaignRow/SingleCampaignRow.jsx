import React, { useContext } from "react";
import { changeCampaignStatus } from "../../../util/api";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./single-campaign-row.css";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function SingleCampaignRow(props) {
  const { campaign } = props;
  const navigate = useNavigate();

  console.log(campaign);
  const { user } = useContext(AppContext);
  console.log(user.user.company_id);

  const handlePauseClick = async (e) => {
    e.preventDefault();
    const campaignUpdate = {
      campaign_id: campaign._id,
      company_id: user.user.company_id,
      campaign_status: "Paused",
    };
    await changeCampaignStatus(campaignUpdate);
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    navigate(`/edit_campaign/${campaign._id}`);
  };

  const handleActiveClick = async (e) => {
    e.preventDefault();
    const campaignUpdate = {
      campaign_id: campaign._id,
      company_id: user.user.company_id,
      campaign_status: "Active",
    };
    await changeCampaignStatus(campaignUpdate);
  };

  const checkStatusForColor = () => {
    if (campaign.campaign_status === "Active")
      return "status-small-circle text-dark bg-success";
    if (campaign.campaign_status === "Paused")
      return "status-small-circle text-dark bg-warning";
    if (campaign.campaign_status === "Draft")
      return "status-small-circle bg-danger";
  };

  return (
    <div className="d-flex col-12 justify-content-between border-bottom text-dark">
      <div className="d-flex col-10 align-items-center mb-2">
        <div className="status-small-circle-container">
          <div className={checkStatusForColor()}></div>
        </div>
        {campaign.asset ? (
          <img
            className="campaign-small-image"
            src={campaign.asset}
            alt="Campaign"
          />
        ) : (
          <img
            className="campaign-small-image"
            src="/images/global.png"
            alt="Campaign"
          />
        )}
        <p className="fs-6 p-0 my-0 mx-2 name-row">
          <b>Name:</b> {campaign.campaign_name}
        </p>
        <p className="fs-6 p-0 my-0 mx-2 type-row">
          <b>Bid:</b> ${campaign.current_bid}
        </p>
        <p className="fs-6 p-0 my-0 mx-2 type-row">
          <b>Today Spent:</b> ${campaign.today_spent} / ${campaign.daily_budget}
        </p>
        <p className="fs-6 p-0 my-0 mx-2 type-row">
          <b>Total Spent:</b> ${campaign.total_spent} / ${campaign.total_budget}
        </p>
        <p className="fs-6 p-0 my-0 mx-2 type-row">
          <b>Status:</b> {campaign.campaign_status}
        </p>
        <p className="fs-6 p-0 my-0 mx-2 type-row">
          <b>Date Created:</b> {campaign.date_created.split("T")[0]}
        </p>
      </div>
      <div className="d-flex col-2 align-items-center justify-content-end">
        <button
          className="d-flex align-items-center justify-content-evenly campaign-row-btn"
          onClick={handleEditClick}
        >
          <FiEdit />
          Edit
        </button>{" "}
        {campaign.campaign_status === "Active" && (
          <button
            className="d-flex align-items-center justify-content-evenly campaign-row-btn"
            onClick={handlePauseClick}
          >
            <BsPauseCircle />
            Pause
          </button>
        )}
        {campaign.campaign_status !== "Active" && (
          <button
            className="d-flex align-items-center justify-content-evenly campaign-row-btn"
            onClick={handleActiveClick}
          >
            <BsPlayCircle />
            Start
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleCampaignRow;
