import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomeTab from "./pages/HomeTab";

function AppRoutes(props) {
  return (
    <Switch>
      <Route path="/" component={HomeTab} exact />
    </Switch>
  );
}
export default AppRoutes;
