import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import {
  addMoneyToUserBalance,
  getAdToStream,
  chargeCompany,
} from "../../../util/api";
import "./start-streaming.css";

function StartStreaming() {
  const { user } = useContext(AppContext);
  console.log(user);
  let streamingInterval;

  const handleStartStreaming = (e) => {
    e.preventDefault();
    loopFunctionsForInterval();
    streamingInterval = setInterval(loopFunctionsForInterval, 10000);
  };

  const loopFunctionsForInterval = async () => {
    //Rishon:
    // const area = { lat: 31.972595, lng: 34.798461 };
    //TelAviv:
    const area = { lng: 32.091038, lat: 34.784365 };

    const adToStream = await getAdToStream({
      area,
      promoterID: user.user.promoter_id,
    });
    console.log(adToStream);
    if (adToStream === "No ad to stream") {
      clearInterval(streamingInterval);
      alert("No ads to show");
    } else {
      // const response = showAdOnMonitor();

      const moneyToAdd = 0.3 * adToStream.current_bid;
      console.log(moneyToAdd);
      // //push to monitor
      const response = await addMoneyToUserBalance({
        moneyToAdd: moneyToAdd,
        promoterID: user.user.promoter_id,
      });
      console.log(response);
      const resp = await chargeCompany({
        bid: adToStream.current_bid,
        companyID: adToStream.company_id,
        campaignID: adToStream._id,
      });
      console.log(resp);
    }
    //push to stream history(moneyEarned,)
  };

  const handleStopStreaming = (e) => {
    e.preventDefault();
    clearInterval(streamingInterval);
    console.log("stop");
  };

  return (
    <div className="d-flex col-12 p-5">
      <button className="start-streaming-btn" onClick={handleStartStreaming}>
        Start
      </button>
      <button onClick={handleStopStreaming}>Stop</button>
    </div>
  );
}

export default StartStreaming;
