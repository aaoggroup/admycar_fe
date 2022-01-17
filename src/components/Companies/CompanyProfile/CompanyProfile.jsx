import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getSingleCompany } from "../../../util/api";
import { Card } from "react-bootstrap";
import "./company-profile.css";

function CompanyProfile() {
  const { user } = useContext(AppContext);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const unsub = async () => {
      const response = await getSingleCompany(user.user.company_id);
      console.log(response.data[0]);
      setCompanyData(response.data[0]);
    };
    unsub();
    return unsub();
  }, []);

  return (
    <div className="d-flex col-12 justify-content-center align-items-center">
      <Card className="d-flex col-6 card-profile-data-container border-0 p-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column justify-content-evenly">
            <p className="d-flex fs-4 align-items-center">
              Welcome Back {companyData.company_name}!
              <button
                // onClick={handleEditProfileOpen}
                type="submit"
                className="d-flex edit-btn"
              >
                {/* <FiEdit3 className="edit-icon" /> */}
              </button>
            </p>
            <p className="d-flex fs-5">Email: {companyData.email}</p>
            <p className="d-flex fs-5">
              Contact Person: {companyData.first_name} {companyData.last_name}
            </p>
            <p className="d-flex fs-5">
              Phone Number: {companyData.phone_number}
            </p>
            <p className="d-flex fs-5">
              Company Number: {companyData.company_number}
            </p>
            <p className="d-flex fs-5">
              Company Vat ID: {companyData.company_vat_id}
            </p>
          </div>
        </div>
      </Card>
      <Card className="col-4">${companyData.balance}</Card>
    </div>
  );
}

export default CompanyProfile;
