import React, { useState, useContext, useEffect } from "react";
import { Form, Card, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { controller, editCampaign, getSingleCampaign } from "../../../util/api";
import "./edit-global-campaign.css";

function EditGlobalCampaign() {
  const { campaign_id } = useParams();
  const [campaignInfo, setCampaignInfo] = useState();
  const { user } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [bid, setBid] = useState(null);
  const [dailyBudget, setDailyBudget] = useState(null);
  const [totalCampaignBudget, setTotalCampaignBudget] = useState(null);
  const [area, setArea] = useState(0);
  const [status, setStatus] = useState();

  useEffect(async () => {
    try {
      const data = await getSingleCampaign({
        campaign_id,
        company_id: user.user.company_id,
      });
      if (data) {
        setCampaignInfo(data.data);
        populateCampaignData(data.data);
      }
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  const populateCampaignData = (campaignInfo) => {
    setImage(campaignInfo.asset);
    setName(campaignInfo.campaign_name);
    setBid(campaignInfo.current_bid);
    setDailyBudget(campaignInfo.daily_budget);
    setTotalCampaignBudget(campaignInfo.total_budget);
    setStatus(campaignInfo.campaign_status);
    setArea(campaignInfo.area);
  };

  const handleEditCampaign = async (e) => {
    e.preventDefault();
    const campaignsProperties = {
      campaign_id: campaign_id,
      campaign_name: name,
      company_id: user.user.company_id,
      asset: image,
      current_bid: bid,
      daily_budget: dailyBudget,
      total_budget: totalCampaignBudget,
      area: area,
      date_created: Date.now(),
      campaign_status: status,
    };
    try {
      await editCampaign(campaignsProperties);
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
  };

  return (
    <Form className="d-flex flex-column col-12 justify-content-center align-items-center my-5">
      <h1 className="display-6 mb-4">Edit Your Campaign</h1>
      {campaignInfo && (
        <Card className="d-flex flex-column col-8 justify-content-center align-items-center form-container p-4 search-container">
          <div className="d-flex justify-content-around">
            <div controlId="formFile" className="mb-3 add-pet-form-group">
              <Form.Label>Select image</Form.Label>
              <Form.Control
                className={"form-input"}
                type="file"
                name="image"
                onChange={(e) => setPhotoToUpload(e.target.files[0])}
              />
            </div>
            <div>
              <img
                className="campaign-asset-image"
                alt="campaign image"
                src={image}
              ></img>
            </div>
          </div>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Campaign Name"
            className="input mt-3 border-0 border-bottom"
          />
          <Form.Control
            onChange={(e) => setBid(e.target.value)}
            value={bid}
            type="text"
            placeholder="Bid - Min bid 0.25"
            className="input mt-3 border-0 border-bottom"
          />
          <Form.Control
            onChange={(e) => setDailyBudget(e.target.value)}
            value={dailyBudget}
            type="text"
            placeholder="Daily budget"
            className="input mt-3 border-0 border-bottom"
          />
          <Form.Control
            onChange={(e) => setTotalCampaignBudget(e.target.value)}
            value={totalCampaignBudget}
            type="text"
            placeholder="Total campaign budget"
            className="input mt-3 border-0 border-bottom"
          />
          <Form.Control
            onChange={(e) => setArea(e.target.value)}
            value={area}
            type="text"
            placeholder="Area"
            className="input mt-3 border-0 border-bottom"
          />
          <Form.Control
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            type="text"
            placeholder="Area"
            className="input mt-3 border-0 border-bottom"
          />

          <div className="search-btn-container">
            <button
              onClick={(e) => handleEditCampaign(e, "Active")}
              className="search-btn mt-4"
            >
              Edit Campaign
            </button>
          </div>
        </Card>
      )}
    </Form>
  );
}

export default EditGlobalCampaign;
