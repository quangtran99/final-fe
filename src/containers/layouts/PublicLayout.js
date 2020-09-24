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
import DashboardPage from "../DashboardPage";
import VerifyEmailPage from "../VerifyEmailPage";
import TransactionPage from "../TransactionPage";

const PublicLayout = () => {
  return (
    <>
      <Container>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/verify/:code" component={VerifyEmailPage} />
          <Route exact path="/products/:id" component={ProductDetailPage} />
          <PrivateRoute exact path="/transaction" component={TransactionPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/finish-order" component={CompleteOrder} />
          <PrivateRoute exact path="/checkout" component={CheckOut} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
