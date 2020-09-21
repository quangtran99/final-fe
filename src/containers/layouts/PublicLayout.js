import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AddEditProductPage from "../AddEditProductPage";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import PublicNavbar from "../PublicNavbar";
import RegisterPage from "../RegisterPage";
import AlertMsg from "./Alert";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "../Routes/PrivateRoute";
import ProductDetailPage from "../ProductDetailPage";
import Cart from "../Cart";
import CheckOut from "../CheckOut";
import CompleteOrder from "../CompleteOrder";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/products/:id" component={ProductDetailPage} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/finish-order" component={CompleteOrder} />
          <PrivateRoute exact path="/checkout" component={CheckOut} />
          <PrivateRoute
            exact
            path="/product/add"
            component={AddEditProductPage}
          />
          <PrivateRoute
            exact
            path="/product/edit/:id"
            component={AddEditProductPage}
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
