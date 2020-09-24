import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import { useSelector } from "react-redux";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import PublicNavbar from "../PublicNavbar";

const Routes = (props) => {
  const auth = useSelector((s) => s.auth);
  const loading = useSelector((state) => state.auth.loading);
  const role = useSelector((state) => state.auth.user.role);

  const renderLayout = () => {
    if (role === "admin") {
      return <AdminLayout />;
    } else {
      return <PublicLayout />;
    }
  };

  return (
    <>
      <PublicNavbar />
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/" component={renderLayout}></Route>
      </Switch>
    </>
  );
};
export default Routes;
