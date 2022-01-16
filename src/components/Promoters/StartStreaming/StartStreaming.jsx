import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { addMoneyToUserBalance, getAdToStream } from "../../../util/api";

function StartStreaming() {
  const { user } = useContext(AppContext);
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
    // chargeCompany(adToSteam.bid);
    const moneyToAdd = 0.3 * adToStream.current_bid;
    console.log(moneyToAdd);
    const response = await addMoneyToUserBalance({
      moneyToAdd: moneyToAdd,
      promoterID: user.user.promoter_id,
    });
    console.log(response);
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
