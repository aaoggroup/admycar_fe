import React, { useState, useContext } from "react";
import { Form, Card } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import { addCampaign } from "../../../util/api";

function GlobalCampaign() {
  const { user } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [bid, setBid] = useState(null);
  const [dailyBudget, setDailyBudget] = useState(null);
  const [totalCampaignBudget, setTotalCampaignBudget] = useState(null);
  const [area, setArea] = useState(0);

  const handleUploadCampaign = async (e) => {
    e.preventDefault();
    const campaignsProperties = {
      campaign_name: name,
      company_id: user.user.company_id,
      asset: image,
      current_bid: bid,
      daily_budget: dailyBudget,
      total_budget: totalCampaignBudget,
      area: area,
      date_created: Date.now(),
      campaign_status: "Active", //handle also draft
    };
    console.log(campaignsProperties);
    try {
      const response = await addCampaign(campaignsProperties);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const setPhotoToUpload = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(reader);
  };
  console.log(image);

  return (
    <Form className="d-flex col-12 justify-content-center mt-5">
      <Card className="d-flex flex-column col-8 justify-content-center form-container p-4 search-container">
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Campaign Name"
          className="input mt-3 border-0 border-bottom"
        />
        <Form.Control
          onChange={(e) => setBid(e.target.value)}
          type="text"
          placeholder="Bid"
          className="input mt-3 border-0 border-bottom"
        />
        <Form.Control
          onChange={(e) => setDailyBudget(e.target.value)}
          type="text"
          placeholder="Daily budget"
          className="input mt-3 border-0 border-bottom"
        />
        <Form.Control
          onChange={(e) => setTotalCampaignBudget(e.target.value)}
          type="text"
          placeholder="Total campaign budget"
          className="input mt-3 border-0 border-bottom"
        />
        <Form.Control
          onChange={(e) => setArea(e.target.value)}
          type="text"
          placeholder="Area"
          className="input mt-3 border-0 border-bottom"
        />
        <Form.Group controlId="formFile" className="mb-3 add-pet-form-group">
          <Form.Label>Select image</Form.Label>
          <Form.Control
            className={"form-input"}
            type="file"
            name="image"
            onChange={(e) => setPhotoToUpload(e.target.files[0])}
          />
        </Form.Group>
        <div className="search-btn-container">
          <button onClick={handleUploadCampaign} className="search-btn mt-4">
            Add Campaign
          </button>
        </div>
      </Card>
    </Form>
  );
}

export default GlobalCampaign;
