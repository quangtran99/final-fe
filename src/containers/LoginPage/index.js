import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const loginWithFacebook = (response) => {
    console.log("facebook", response);
    dispatch(authActions.loginFacebookRequest(response.accessToken));
  };

  const loginWithGoogle = (response) => {
    console.log("google", response);
    dispatch(authActions.loginGoogleRequest(response.accessToken));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    dispatch(authActions.loginRequest(email, password));
  };
  if (isAuthenticated) {
    if (user.role === "admin") {
      return <Redirect to="/admin" />;
    } else {
      return <Redirect to="/" />;
    }
  }
  console.log("abc", user);
  console.log("def", isAuthenticated);
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">Sign In</h1>
              <p className="lead">
                <i className="fas fa-user" /> Sign Into Your Account
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="email"
                required
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
                minLength="3"
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
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
                Login
              </Button>
            )}
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            <p className="d-flex flex-column text-center">
              <FacebookLogin
                appId="362844698458589"
                autoLoad={false}
                fields="name,email,picture"
                icon="fa-facebook"
                callback={loginWithFacebook}
                containerStyle={{
                  textAlign: "center",
                  backgroundColor: "#3b5998",
                  borderColor: "#3b5998",
                  flex: 1,
                  display: "flex",
                  color: "#fff",
                  cursor: "pointer",
                  marginBottom: "3px",
                }}
                buttonStyle={{
                  flex: 1,
                  textTransform: "none",
                  padding: "12px",
                  background: "none",
                  border: "none",
                }}
              />
              <GoogleLogin
                className="google-btn d-flex justify-content-center"
                clientId="541133378796-38h1fht8h9jnre44ijv11ovlk3gqbjoe.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={loginWithGoogle}
                onFailure={loginWithGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
