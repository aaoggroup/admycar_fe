import React from "react";
import "./edit-campaign-skeleton.css";
import { Card } from "react-bootstrap";

function EditCampaignSkeleton() {
  return (
    <>
      <Card className="d-flex flex-column col-7 justify-content-center align-items-center p-4">
        <div className="d-flex col-12 justify-content-between">
          <div className="col-6 mt-4">
            <div className="edit-campaign-row-skeleton rounded col-9" />
          </div>
          <div className="d-flex justify-content-end col-6">
            <div className="edit-campaign-asset-skeleton rounded col-9" />
          </div>
        </div>
        <div className="col-12 mt-4">
          <div className="edit-campaign-row-skeleton rounded col-12" />
        </div>
        <div className="col-12 mt-4">
          <div className="edit-campaign-row-skeleton rounded col-12" />
        </div>
        <div className="col-12 mt-4">
          <div className="edit-campaign-row-skeleton rounded col-12" />
        </div>
        <div className="d-flex col-7 mt-4 justify-content-center">
          <div className="edit-campaign-btn-skeleton rounded col-3" />
        </div>
      </Card>
    </>
  );
}

export default EditCampaignSkeleton;
