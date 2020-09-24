import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { authActions } from "../../redux/actions";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const cart = useSelector((state) => state.auth.user?.cart);
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  const adminLinks = (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/admin" className="mr-auto">
        {/* <img src={logo} alt="CoderSchool" /> */}
        Some Random Shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const authLinks = (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        {/* <img src={logo} alt="CoderSchool" /> */}
        Some Random Shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link as={Link} to="/dashboard">
            <i className="fas fa-chart-line" /> Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <i className="fas fa-chart-line" /> Cart (
            {cart?.length ? cart.length : 0})
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" /> Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  const publicLinks = (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        {/* <img src={logo} alt="CoderSchool" /> */}
        Some Random Shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link as={Link} to="/register">
            <i className="fas fa-registered" /> Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            <i className="fas fa-sign-in-alt" /> Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const renderNavbar = () => {
    console.log("user", user);
    if (user.role) {
      if (user.role === "admin") {
        return adminLinks;
      } else {
        return authLinks;
      }
    } else {
      return publicLinks;
    }
  };

  return renderNavbar();
};

export default PublicNavbar;
