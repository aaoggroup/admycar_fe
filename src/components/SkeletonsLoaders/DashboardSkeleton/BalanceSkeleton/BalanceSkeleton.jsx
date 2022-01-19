import React from "react";
import "./balance-skeleton.css";

function BalanceSkeleton() {
  return (
    <>
      <div className="d-flex flex-column col-12">
        <div className="d-flex justify-content-around">
          <div className="balance-row-skeleton rounded col-6" />
        </div>
      </div>
    </>
  );
}

export default BalanceSkeleton;
