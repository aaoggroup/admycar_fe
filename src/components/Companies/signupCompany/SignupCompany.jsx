import React, { useContext, useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./signupCompany.css";
import { signUpCompany } from "../../../util/api";

function SignupCompany() {
  const {
    setUser,
    setIsSignupCompanyModal,
    isSignupCompanyModal,
    setIsLoginCompanyModal,
  } = useContext(AppContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordRepeat, setUserPasswordRepeat] = useState("");
  const [userCompanyName, setUserCompanyName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userCompanyNumber, setUserCompanyNumber] = useState("");
  const [userCompanyVatId, setUserCompanyVatId] = useState("");
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [isPasswordDoesntMatch, setIsPasswordDoesntMatch] = useState(false);
  const [error, setError] = useState("");

  const onClickLogin = (e) => {
    e.preventDefault();
    setIsLoginCompanyModal((pre) => !pre);
    setIsSignupCompanyModal((pre) => !pre);
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    if (userPassword !== userPasswordRepeat) {
      setIsPasswordDoesntMatch(true);
      return;
    }
    setIsPasswordDoesntMatch(false);
    const newCompany = {
      email: userEmail,
      password: userPassword,
      confirm_password: userPasswordRepeat,
      first_name: userFirstName,
      last_name: userLastName,
      phone_number: userPhoneNumber,
      company_name: userCompanyName,
      company_number: userCompanyNumber,
      company_vat_id: userCompanyVatId,
    };
    try {
      const response = await signUpCompany(newCompany);
      if (response) {
        setUser(response);
        setIsSignupCompanyModal((pre) => !pre);
      } else setError(response.data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Modal show={isSignupCompanyModal} onHide={setIsSignupCompanyModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Card className="w-100">
          <Card.Body>
            <h2 className="text-center mb-4">Join as advertiser</h2>
            <Form onSubmit={(e) => HandleOnSubmit(e)}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="passwordRepeat">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setUserPasswordRepeat(e.target.value)}
                  required
                />
              </Form.Group>
              {isPasswordDoesntMatch && (
                <h3 className="text-danger">
                  Please make sure the passwords match
                </h3>
              )}
              <Form.Group id="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserCompanyName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserLastName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group
                id="phoneNumber"
                className="mt-2 phone-number-container"
              >
                <PhoneInput
                  inputClass="phone-number-input"
                  country={"il"}
                  value={userPhoneNumber}
                  onChange={(number) => setUserPhoneNumber(number)}
                />
              </Form.Group>
              <Form.Group id="companyNumber">
                <Form.Label>Company Number</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserCompanyNumber(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="companyVatId">
                <Form.Label>Company Vat Id</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserCompanyVatId(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                disabled={isLoadingSignup}
                className="w-100"
                type="submit"
              >
                Sign up
              </Button>
              {error && (
                <h3 className="text-danger">Couldn't register, {error}</h3>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="w-100 text-center mt-2">
          Already have an account?{" "}
          <span className="text-primary pe-auto" onClick={onClickLogin}>
            <u id="loginButton">Sign in</u>
          </span>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupCompany;
