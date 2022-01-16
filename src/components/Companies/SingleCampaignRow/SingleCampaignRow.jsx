import React from "react";
import { Button, ListGroup } from "react-bootstrap";

function SingleCampaignRow(props) {
  const { campaign } = props;
  const handlePause = (e) => {
    e.preventDefault();
    //add function
  };
  const handleActive = (e) => {
    e.preventDefault();
    //add function
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
          <Button onClick={handlePause}>Pause</Button>
        )}
        {campaign.campaign_status === "Paused" && (
          <Button onClick={handleActive}>Start</Button>
        )}
        {campaign.campaign_status === "Draft" && (
          <Button onClick={handleActive}>Start</Button>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SingleCampaignRow;
