import React from "react";
import "./todays-spent-skeleton.css";

function TodaysSpent() {
  return (
    <>
      <div className="d-flex flex-column col-12">
        <div className="d-flex justify-content-around">
          <div className="todays-row-skeleton rounded col-6" />
        </div>
      </div>
    </>
  );
}

export default TodaysSpent;
