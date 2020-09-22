import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AddEditProductPage from "../AddEditProductPage";

import PublicNavbar from "../PublicNavbar";

import AlertMsg from "./Alert";
import NotFoundPage from "./NotFoundPage";
import ProductDetailPage from "../ProductDetailPage";
import SideMenu from "../Admin/SideMenu";
import ProfilePage from "../Admin/ProfilePage";

const AdminLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row>
          <SideMenu />
          <Col md={9} lg={10}>
            <AlertMsg />
            <Switch>
              <Route exact path="/admin/profile" component={ProfilePage} />
              <Route
                exact
                path="/admin/blogs/:id"
                component={ProductDetailPage}
              />
              <Route
                exact
                path="/admin/blog/add"
                component={AddEditProductPage}
              />
              <Route
                exact
                path="/admin/blog/edit/:id"
                component={AddEditProductPage}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
