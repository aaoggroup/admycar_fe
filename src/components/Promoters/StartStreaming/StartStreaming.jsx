import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import {
  addMoneyToUserBalance,
  getAdToStream,
  chargeCompany,
} from "../../../util/api";

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
    // console.log("stream");
    const area = 1;
    const adToStream = await getAdToStream({
      area,
      promoterID: user.user.promoter_id,
    });
    console.log(adToStream);
    // const response = showAdOnMonitor();
    // if (response.ok) {
    // chargeCompa÷ny(adToSteam.bid);
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

    //charge company
    //push to stream history(moneyEarned,)
    // } else alert("unable to stream");
  };

  const handleStopStreaming = (e) => {
    e.preventDefault();
    clearInterval(streamingInterval);
    console.log("stop");
  };

  return (
    <div>
      <button onClick={handleStartStreaming}>Start</button>
      <button onClick={handleStopStreaming}>Stop</button>
    </div>
  );
}

export default StartStreaming;
