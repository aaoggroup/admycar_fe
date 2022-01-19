import React from "react";
import "./total-spent-skeleton.css";

function TotalSpentSkeleton() {
  return (
    <>
      <div className="d-flex flex-column col-12">
        <div className="d-flex justify-content-around">
          <div className="total-row-skeleton rounded col-6" />
        </div>
      </div>
    </>
  );
}

export default TotalSpentSkeleton;
