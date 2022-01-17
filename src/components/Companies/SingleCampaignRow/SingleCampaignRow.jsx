import React, { useContext } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { changeCampaignStatus } from "../../../util/api";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <ListGroup horizontal className="w-100">
      <ListGroup.Item>{campaign.campaign_name}</ListGroup.Item>
      <ListGroup.Item>{campaign.current_bid}$</ListGroup.Item>
      <ListGroup.Item>
        {campaign.today_spent}$ / {campaign.daily_budget}$
      </ListGroup.Item>
      <ListGroup.Item>
        {campaign.total_spent}$ / {campaign.total_budget}$
      </ListGroup.Item>
      <ListGroup.Item>{campaign.date_created.split("T")[0]}</ListGroup.Item>

      <ListGroup.Item>{campaign.campaign_status}</ListGroup.Item>
      <ListGroup.Item>
        {campaign.campaign_status === "Active" && (
          <Button onClick={handlePauseClick}>Pause</Button>
        )}
        {campaign.campaign_status === "Paused" && (
          <Button onClick={handleActiveClick}>Start</Button>
        )}
        {campaign.campaign_status === "Draft" && (
          <Button onClick={handleActiveClick}>Start</Button>
        )}
      </ListGroup.Item>
      <ListGroup.Item>
        <Button onClick={handleEditClick}>Edit</Button>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SingleCampaignRow;
