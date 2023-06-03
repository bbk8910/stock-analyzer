import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeTab from "./home/HomeTab";

function AppRoutes(props) {
  return (
    <Switch>
      <Route path="/stock-analyzer" component={HomeTab} exact />
    </Switch>
  );
}
export default AppRoutes;
