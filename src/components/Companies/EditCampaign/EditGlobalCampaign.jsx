import React, { useState, useContext, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { controller, editCampaign, getSingleCampaign } from "../../../util/api";
import "./edit-global-campaign.css";
import { BsSave } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function EditGlobalCampaign() {
  const { campaign_id } = useParams();
  const [campaignInfo, setCampaignInfo] = useState();
  const { user } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [bid, setBid] = useState(null);
  const [dailyBudget, setDailyBudget] = useState(null);
  const [totalCampaignBudget, setTotalCampaignBudget] = useState(null);
  const [area, setArea] = useState(100);
  const [status, setStatus] = useState();
  const [areaMap, setAreaMap] = useState(false);

  const navigate = useNavigate();

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
      navigate("/all_campaigns");
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

  const handleSetArea1Click = (e) => {
    e.preventDefault();
    setArea(1);
  };

  const handleSetArea2Click = (e) => {
    e.preventDefault();
    setArea(2);
  };

  const handleSetArea3Click = (e) => {
    e.preventDefault();
    setArea(3);
  };

  const handleSetAllAreaClick = (e) => {
    e.preventDefault();
    setArea(100);
  };

  const handleOpenAreaMap = () => setAreaMap((prev) => !prev);

  return (
    <>
      <h1 className="display-6 my-5">Edit Your Campaign</h1>
      <Form className="d-flex col-12 justify-content-evenly align-items-center mb-5">
        <Card className="d-flex flex-column col-7 justify-content-center align-items-center form-container p-4">
          <div className="d-flex col-12 justify-content-between">
            <div controlId="formFile" className="col-6">
              <Form.Label className="fw-bold">Select image</Form.Label>
              <Form.Control
                className={"form-input"}
                type="file"
                name="image"
                onChange={(e) => setPhotoToUpload(e.target.files[0])}
              />
            </div>
            <div className="d-flex justify-content-end col-6">
              <img
                className="campaign-asset-image"
                alt="campaign image"
                src={image}
              ></img>
            </div>
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Campaign Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Campaign Name"
              className="border-0 border-bottom border-top"
            />
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Bid</Form.Label>
            <Form.Control
              onChange={(e) => setBid(e.target.value)}
              value={bid}
              type="text"
              placeholder="Bid"
              className="border-0 border-bottom border-top"
            />
            <small>*Min bid $0.25</small>
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Daily budget</Form.Label>
            <Form.Control
              onChange={(e) => setDailyBudget(e.target.value)}
              value={dailyBudget}
              type="text"
              placeholder="Daily budget"
              className="border-0 border-bottom border-top"
            />
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Total campaign budget</Form.Label>
            <Form.Control
              onChange={(e) => setTotalCampaignBudget(e.target.value)}
              value={totalCampaignBudget}
              type="text"
              placeholder="Total campaign budget"
              className="border-0 border-bottom border-top"
            />
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Status</Form.Label>
            <Form.Control
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              type="text"
              placeholder="Status"
              className="border-0 border-bottom border-top"
            />
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Select Area</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Check
                onClick={handleOpenAreaMap}
                type="switch"
                id="custom-switch"
                label={area === 100 ? "All Area" : area}
              />
              <button
                onClick={handleSetAllAreaClick}
                className="clear-selection-btn col-10"
              >
                Clear Selection
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={(e) => handleEditCampaign(e, "Active")}
              className="d-flex edit-campaign-btn align-items-center justify-content-around"
            >
              <BsSave />
              Save Changes
            </button>
          </div>
        </Card>
        {areaMap && (
          <div className="d-flex flex-column align-items-center col-4">
            <Form.Label className="fw-bold mb-4">
              Choose Area To Advertise
            </Form.Label>
            <button
              onClick={handleSetArea1Click}
              className="area-image-btn1 col-10"
            >
              <img
                className="col-12"
                src="/images/area_1.1.png"
                alt="Company Profile"
              />
            </button>
            <button
              onClick={handleSetArea2Click}
              className="area-image-btn2 col-10"
            >
              <img
                className="col-12"
                src="/images/area_2.1.png"
                alt="Company Profile"
              />
            </button>
            <button
              onClick={handleSetArea3Click}
              className="area-image-btn3 col-10"
            >
              <img
                className="col-12"
                src="/images/area_3.1.png"
                alt="Company Profile"
              />
            </button>
          </div>
        )}
      </Form>
    </>
  );
}

export default EditGlobalCampaign;
