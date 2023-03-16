import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';

const Popup = ({showPopup}) => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    setShow(false);
    showPopup(false);

  }
  const handleSubmit = () => {
    console.log(`Email: ${email}, Phone: ${phone}`);
    handleClose();
  };
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setPhone(userInfo.phoneNumber);
    }
  }, [userInfo]);

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>Get Notified</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "35px", fontSize: "14px" }}
              />
              <br />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ height: "35px", fontSize: "14px" }}
              />
              <br />
              <Form.Check 
                type="checkbox"
                id="confirm-notify" 
                name="confirmnotify" 
                value="confirm" 
                label="By clicking submit, I confirm that I have read and accept general terms and conditions, in terms of use and Privacy statement."
                checked={checked}
                onChange={() => setChecked(!checked)}
                style={{ fontSize: "14px" , opacity: 0.7 }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;