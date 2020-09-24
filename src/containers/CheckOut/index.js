import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { transactionActions } from "../../redux/actions";

const ChangeStepButtons = ({ eventKey, setEventKey }) => {
  const key = Number(eventKey);
  return (
    <>
      {key > 0 && key < 4 && (
        <Button variant="light" onClick={() => setEventKey(key - 1 + "")}>
          Back
        </Button>
      )}
      {key >= 0 && key < 3 && (
        <Button variant="primary" onClick={() => setEventKey(key + 1 + "")}>
          Next
        </Button>
      )}
    </>
  );
};

const CheckOut = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    shipping: "Standard",
    payment: "COD",
  });
  const [eventKey, setEventKey] = useState("0");

  const loading = useSelector((state) => state.transaction.loading);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fillFakeData = () => {
    setFormData({
      name: "Quang",
      email: "Quang@gmail.com",
      address: "12 Ton Dan Street, Dist 4",
      shipping: "Standard",
      payment: "COD",
    });
  };

  const submitOrder = () => {
    dispatch(transactionActions.createNewOrder(formData));
  };

  return (
    <Container>
      <Accordion activeKey={eventKey}>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              onClick={() => setEventKey("0")}
            >
              Address Information
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        name="adress"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Button
                      className="btn-block"
                      type="button"
                      variant="light"
                      onClick={fillFakeData}
                    >
                      Fill in fake data
                    </Button>
                    <ChangeStepButtons
                      eventKey={eventKey}
                      setEventKey={setEventKey}
                    />
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="1"
              onClick={() => setEventKey("1")}
            >
              Shipping Method
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div>Standard * Free ship</div>
              <ChangeStepButtons
                eventKey={eventKey}
                setEventKey={setEventKey}
              />{" "}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="2"
              onClick={() => setEventKey("2")}
            >
              Payment Method
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <div>Cash on Delivery </div>
              <ChangeStepButtons
                eventKey={eventKey}
                setEventKey={setEventKey}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="3"
              onClick={() => setEventKey("3")}
            >
              Confirmation
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <div> Contact: {formData.email}</div>
              <div> Address: {formData.address}</div>
              <div> Payment: {formData.payment}</div>
              <div> Shipping: {formData.shipping}</div>
              <ChangeStepButtons
                eventKey={eventKey}
                setEventKey={setEventKey}
              />
              <Link to="/finish-order">
                {" "}
                <Button onClick={submitOrder} disabled={loading}>
                  {" "}
                  Complete Order{" "}
                </Button>{" "}
              </Link>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default CheckOut;
