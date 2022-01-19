import React, { useState, useContext, useEffect } from "react";
import { changeCampaignStatus } from "../../../util/api";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./single-campaign-row.css";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function SingleCampaignRow(props) {
  const { campaign } = props;
  const { user } = useContext(AppContext);
  const [isCampaignActive, setIsCampaignActive] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (campaign?.campaign_status === "Active") {
      setIsCampaignActive(true);
    } else {
      setIsCampaignActive(false);
    }
  }, []);

  const handlePauseClick = async (e) => {
    e.preventDefault();
    const campaignUpdate = {
      campaign_id: campaign._id,
      company_id: user.user.company_id,
      campaign_status: "Paused",
    };
    await changeCampaignStatus(campaignUpdate);
    setIsCampaignActive((prev) => !prev);
    setCampaignStatus("Paused");
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
    setIsCampaignActive((prev) => !prev);
    setCampaignStatus("Active");
  };

  const checkStatusForColor = () => {
    if (campaignStatus === "Active" || campaign.campaign_status === "Active")
      return "fs-6 m-0 p-2 d-flex align-items-center status-container text-light bg-success";
    if (campaignStatus === "Paused" || campaign.campaign_status === "Paused")
      return "fs-6 m-0 p-2 d-flex align-items-center status-container text-light bg-warning";
    if (campaignStatus || campaign.campaign_status === "Draft")
      return "fs-6 m-0 p-2 d-flex align-items-center status-container text-light bg-danger";
  };

  return (
    <div className="d-flex col-12 justify-content-between border-bottom text-dark">
      <div className="d-flex col-10 align-items-center mb-2">
        <div className="d-flex col-1 mt-2 justify-content-center">
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
        </div>
        <div className="d-flex col-2 mt-2 justify-content-center">
          <p className="fs-6 m-0">{campaign.campaign_name}</p>
        </div>
        <div className="d-flex col-1 mt-2 justify-content-center">
          <p className="fs-6 m-0">${campaign.current_bid}</p>
        </div>
        <div className="d-flex col-2 mt-2 justify-content-center">
          <p className="fs-6 m-0">
            ${campaign.today_spent.toFixed(2)} / ${campaign.daily_budget}
          </p>
        </div>
        <div className="d-flex col-2 mt-2 justify-content-center">
          <p className="fs-6 m-0">
            ${campaign.total_spent.toFixed(2)} / ${campaign.total_budget}
          </p>
        </div>
        <div className="d-flex col-1 mt-2 justify-content-center">
          <p className="fs-6 m-0">{campaign.area}</p>
        </div>
        <div className="d-flex col-1 mt-2 justify-content-center">
          <p className={checkStatusForColor()}>
            {campaignStatus || campaign.campaign_status}
          </p>
        </div>
        <div className="d-flex col-2 mt-2 justify-content-center">
          <p className="fs-6 m-0">{campaign.date_created.split("T")[0]}</p>
        </div>
      </div>
      <div className="d-flex col-2 align-items-center justify-content-end">
        <button
          className="d-flex align-items-center justify-content-evenly campaign-row-btn"
          onClick={handleEditClick}
        >
          <FiEdit />
          Edit
        </button>{" "}
        {isCampaignActive && (
          <button
            className="d-flex align-items-center justify-content-evenly campaign-row-btn"
            onClick={handlePauseClick}
          >
            <BsPauseCircle />
            Pause
          </button>
        )}
        {!isCampaignActive && (
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
