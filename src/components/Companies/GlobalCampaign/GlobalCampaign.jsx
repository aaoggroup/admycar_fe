import React, { useState, useContext } from "react";
import { Form, Card } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import { addCampaign } from "../../../util/api";
import "./global-campaign.css";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { VscRocket } from "react-icons/vsc";

function GlobalCampaign() {
  const { user } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [bid, setBid] = useState(null);
  const [dailyBudget, setDailyBudget] = useState(null);
  const [totalCampaignBudget, setTotalCampaignBudget] = useState(null);
  const [area, setArea] = useState(100);
  const [areaMap, setAreaMap] = useState(false);

  const handleUploadCampaign = async (e, status) => {
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
      campaign_status: status,
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

  const handleOpenAreaMap = () => setAreaMap((prev) => !prev);

  return (
    <>
      <h1 className="display-6 my-5">Launch New Campaign</h1>
      <Form className="d-flex col-12 justify-content-evenly align-items-center mb-5">
        <Card className="d-flex flex-column col-7 justify-content-center align-items-center form-container p-4">
          <div className="col-12 mt-4 justify-content-center">
            <Form.Label className="fw-bold">Campaign Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Campaign Name"
              className="border-0 border-bottom border-top"
            />
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Bid</Form.Label>
            <Form.Control
              onChange={(e) => setBid(e.target.value)}
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
              type="text"
              placeholder="Daily budget"
              className="border-0 border-bottom border-top"
            />
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Total campaign budget</Form.Label>
            <Form.Control
              onChange={(e) => setTotalCampaignBudget(e.target.value)}
              type="text"
              placeholder="Total campaign budget"
              className="border-0 border-bottom border-top"
            />
          </div>
          <div className="col-12 mt-4">
            <Form.Label className="fw-bold">Select Area</Form.Label>
            <Form.Check
              onClick={handleOpenAreaMap}
              type="switch"
              id="custom-switch"
              label={area}
            />
          </div>
          <div className="d-flex col-12 mt-4 justify-content-between">
            <div controlId="formFile">
              <Form.Label className="fw-bold">Select image</Form.Label>
              <Form.Control
                className={"form-input"}
                type="file"
                name="image"
                onChange={(e) => setPhotoToUpload(e.target.files[0])}
              />
            </div>
          </div>
          <div className="d-flex col-6 justify-content-around mt-4">
            <button
              onClick={(e) => handleUploadCampaign(e, "Active")}
              className="new-campaign-btn d-flex align-items-center justify-content-around"
            >
              <VscRocket />
              Launch Campaign
            </button>
            <button
              onClick={(e) => handleUploadCampaign(e, "Draft")}
              className="draft-campaign-btn d-flex align-items-center justify-content-around"
            >
              <MdOutlineStickyNote2 />
              Save as draft
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
              className="area-image-btn1 col-8"
            >
              <img
                className="col-12"
                src="/images/area_1.1.png"
                alt="Company Profile"
              />
            </button>
            <button
              onClick={handleSetArea2Click}
              className="area-image-btn2 col-8"
            >
              <img
                className="col-12"
                src="/images/area_2.1.png"
                alt="Company Profile"
              />
            </button>
            <button
              onClick={handleSetArea3Click}
              className="area-image-btn3 col-8"
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

export default GlobalCampaign;
