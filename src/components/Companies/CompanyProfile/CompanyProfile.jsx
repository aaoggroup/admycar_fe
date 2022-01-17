import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getSingleCompany, controller } from "../../../util/api";
import { Card } from "react-bootstrap";
import "./company-profile.css";

function CompanyProfile() {
  const { user } = useContext(AppContext);
  const [companyData, setCompanyData] = useState([]);

  useEffect(async () => {
    try {
      const response = await getSingleCompany(user.user.company_id);
      setCompanyData(response.data[0]);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="d-flex col-12 justify-content-center align-items-center">
      <Card className="d-flex col-8 border-0 p-3">
        <div className="d-flex col-12 justify-content-between">
          <div className="d-flex col-12 flex-column justify-content-evenly">
            <p className="d-flex fs-3 fw-bold align-items-center justify-content-center">
              Welcome Back {companyData?.company_name}!
            </p>
            <div className="d-flex col-12 flex-column justify-content-center align-items-center fs-4 fw-bold mb-4">
              <small className="fs-6 fw-light">Your Balance</small>$
              {companyData?.balance?.toFixed(2)}
            </div>
            <div className="d-flex col-12 justify-content-evenly">
              <Card className="company-profile-details col-4 mt-4 p-4">
                <p className="d-flex fs-5 fw-bold">Contact Details:</p>
                <p className="d-flex fs-5">
                  Contact Person: {companyData?.first_name}{" "}
                  {companyData?.last_name}
                </p>
                <p className="d-flex fs-5">Email: {companyData?.email}</p>
                <p className="d-flex fs-5">
                  Phone Number: {companyData?.phone_number}
                </p>
              </Card>
              <Card className="company-profile-details col-4 mt-4 p-4">
                <p className="d-flex fs-5 fw-bold">Company Details:</p>
                <p className="d-flex fs-5">
                  Company Number: {companyData?.company_number}
                </p>
                <p className="d-flex fs-5">
                  Company Vat ID: {companyData?.company_vat_id}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CompanyProfile;
