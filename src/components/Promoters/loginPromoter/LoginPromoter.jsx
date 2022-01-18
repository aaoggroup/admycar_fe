import React, { useContext, useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import { loginPromoter } from "../../../util/api";

function LoginPromoter() {
  const {
    setUser,
    setIsLoginPromoterModal,
    isLoginPromoterModal,
    setIsSignupPromoterModal,
  } = useContext(AppContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onClickSignup = (e) => {
    e.preventDefault();
    setIsLoginPromoterModal((pre) => !pre);
    setIsSignupPromoterModal((pre) => !pre);
  };

  const handleOnSubmitLogin = async (e) => {
    e.preventDefault();
    const promoterDetails = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await loginPromoter(promoterDetails);
      if (response) {
        setIsLoginPromoterModal((pre) => !pre);
        setUser(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={isLoginPromoterModal} onHide={setIsLoginPromoterModal}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="w-100">
          <Card.Body>
            <h2 className="text-center mb-4">Welcome Back Promoter!</h2>
            <Form onSubmit={(e) => handleOnSubmitLogin(e)}>
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

              <Button
                disabled={() => console.log("placeholder for function")}
                className="w-100"
                type="submit"
              >
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="w-100 text-center mt-2">
          Don't have an account?{" "}
          <span className="text-primary pe-auto" onClick={onClickSignup}>
            <u id="signUpButton">Sign up</u>
          </span>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginPromoter;
