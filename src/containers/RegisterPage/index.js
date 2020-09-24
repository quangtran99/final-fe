import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const redirectTo = useSelector((state) => state.auth.redirectTo);
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2, avatarUrl } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }
    dispatch(authActions.register(name, email, password, avatarUrl));
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
      },
      function (error, result) {
        if (error) console.log(error);
        if (result && result.event === "success") {
          setFormData({
            ...formData,
            avatarUrl: result.info.secure_url,
          });
        }
      }
    );
  };

  const fillFakeData = () => {
    setFormData({
      name: "Quang",
      email: "todiewhale@gmail.com",
      password: "123",
      password2: "123",
    });
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(authActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(authActions.setRedirectTo(""));
      }
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center mb-3">
            <h1 className="text-primary">Sign Up</h1>
            <p className="lead">
              <i className="fas fa-user" /> Create Your Account
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className="text-center">
                {formData.avatarUrl && (
                  <div className="mb-3">
                    <img
                      src={formData.avatarUrl}
                      className="avatar-lg"
                      alt="avatar"
                    />
                  </div>
                )}
                <Button
                  variant="info"
                  // className="btn-block w-50 "
                  onClick={uploadWidget}
                >
                  Add avatar
                </Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="form-text text-danger">{errors.name}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
              />
            </Form.Group>
            {loading ? (
              <Button
                className="btn-block"
                variant="primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="primary">
                Register
              </Button>
            )}

            {/* TODO: remove fake data */}
            <Button
              className="btn-block"
              type="button"
              variant="light"
              onClick={fillFakeData}
            >
              Fill in fake data
            </Button>

            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterPage;
