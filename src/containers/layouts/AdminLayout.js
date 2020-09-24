import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AddEditProductPage from "../AddEditProductPage";
import AlertMsg from "./Alert";
import NotFoundPage from "./NotFoundPage";
import ProductDetailPage from "../ProductDetailPage";
import SideMenu from "../Admin/SideMenu";
import ProfilePage from "../Admin/ProfilePage";
import HomePage from "../Admin/HomePage";
import TransactionPage from "../Admin/TransactionPage";

const AdminLayout = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <SideMenu />
          <Col md={9} lg={10}>
            <AlertMsg />
            <Switch>
              <Route
                exact
                path="/admin/transaction"
                component={TransactionPage}
              />
              <Route exact path="/admin/profile" component={ProfilePage} />
              <Route
                exact
                path="/admin/products/:id"
                component={ProductDetailPage}
              />
              <Route exact path="/admin/" component={HomePage} />
              <Route
                exact
                path="/admin/product/add"
                component={AddEditProductPage}
              />{" "}
              <Route
                exact
                path="/admin/product/edit/:id"
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
