import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getSinglePromoter, controller } from "../../../util/api";
import { Card } from "react-bootstrap";
import "./promoter-profile.css";
import { MdAddCircleOutline } from "react-icons/md";

function PromoterProfile() {
  const { user } = useContext(AppContext);
  const [promoterData, setPromoterData] = useState([]);

  useEffect(async () => {
    try {
      const response = await getSinglePromoter(user.user.promoter_id);
      setPromoterData(response);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="d-flex col-12 justify-content-center align-items-center">
      <Card className="d-flex col-8 border-0 p-3 align-items-center card-promoter-profile-container">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="add-img-small-btn-container">
            <MdAddCircleOutline className="add-img-small-btn" />
          </div>
          <img
            className="promoter-profile-image"
            src="/images/promoter_profile_placeholder_image.png"
            alt="promoter Profile"
          />
        </div>
        <div className="d-flex col-12 flex-column align-items-center">
          <p className="d-flex fs-3 fw-bold align-items-center justify-content-center">
            Welcome back, {promoterData?.first_name} {promoterData?.last_name}!
          </p>
          <div className="d-flex col-12 justify-content-evenly">
            <div className="d-flex col-5 flex-column justify-content-center align-items-center fs-4 fw-bold mb-4">
              <small className="fs-6 fw-light">Your Pending Balance</small>$
              {promoterData?.pending_balance?.toFixed(2)}
            </div>
            <div className="d-flex col-5 flex-column justify-content-center align-items-center fs-4 fw-bold mb-4">
              <small className="fs-6 fw-light">Your Withdrawal Balance</small>$
              {promoterData?.withdrawal_balance?.toFixed(2)}
            </div>
          </div>
          <Card className="promoter-profile-details d-flex col-4 justify-content-center col-4 mt-4 p-4">
            <p className="d-flex fs-5 fw-bold">Contact Details:</p>
            <p className="d-flex fs-5">Email: {promoterData?.email}</p>
            <p className="d-flex fs-5">Phone: +{promoterData?.phone_number}</p>
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default PromoterProfile;
