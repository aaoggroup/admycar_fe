import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import {
  addMoneyToUserBalance,
  getAdToStream,
  chargeCompany,
  showAdOnMonitor,
} from "../../../util/api";
import "./start-streaming.css";

function StartStreaming() {
  const { user, userCords } = useContext(AppContext);
  const [isStreaming, setIsStreaming] = useState(false);
  const [interval2, setInterval2] = useState(null);

  const handleStartStreaming = (e) => {
    e.preventDefault();
    loopFunctionsForInterval();
    setInterval2(setInterval(loopFunctionsForInterval, 10000));
    setIsStreaming((prev) => !prev);
  };

  const loopFunctionsForInterval = async () => {
    //Rishon:
    // const area = { lat: 31.972595, lng: 34.798461 };
    //TelAviv:
    // const area = { lng: 32.091038, lat: 34.784365 };
    const area = { lng: userCords.lng, lat: userCords.lat };

    const adToStream = await getAdToStream({
      area,
      promoterID: user.user.promoter_id,
    });
    console.log(adToStream);
    if (adToStream === "No ad to stream") {
      clearInterval(interval2);
      setInterval2(null);
      alert("No ads to show");
    } else {
      const monitorResponse = await showAdOnMonitor(adToStream.asset);
      console.log(monitorResponse);
      const moneyToAdd = 0.3 * adToStream.current_bid;
      console.log(moneyToAdd);
      // //push to monitor
      const response = await addMoneyToUserBalance({
        moneyToAdd: moneyToAdd,
        promoterID: user.user.promoter_id,
      });
      const resp = await chargeCompany({
        bid: adToStream.current_bid,
        companyID: adToStream.company_id,
        campaignID: adToStream._id,
      });
    }
    //push to stream history(moneyEarned,)
  };

  const handleStopStreaming = (e) => {
    e.preventDefault();
    clearInterval(interval2);
    setInterval2(null);
    setIsStreaming((prev) => !prev);
    console.log("stop");
  };

  return (
    <>
      <h1 className="display-6 mt-5">
        {user?.user?.first_name}, Let's make some money!
      </h1>
      <div className="d-flex col-12 justify-content-center align-items-center streaming-container">
        {!isStreaming && (
          <button
            className="start-streaming-btn col-6"
            onClick={handleStartStreaming}
          >
            Start
          </button>
        )}
        {isStreaming && (
          <button
            className="stop-streaming-btn col-6"
            onClick={handleStopStreaming}
          >
            Stop
          </button>
        )}
      </div>
    </>
  );
}

export default StartStreaming;
