import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import PublicNavbar from "../PublicNavbar";
import RegisterPage from "../RegisterPage";
import AlertMsg from "./Alert";
import NotFoundPage from "./NotFoundPage";

const PublicLayout = () => {
    return (
      <>
        <PublicNavbar />
        <Container>
        <AlertMsg/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route  path="*" component={NotFoundPage} />
          </Switch>
        </Container>
      </>
    );
  };
  
  export default PublicLayout;