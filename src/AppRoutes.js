import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";

function AppRoutes(props) {
  return (
    <Switch>
      <Route path="/" component={HomePage} exact />
    </Switch>
  );
}
export default AppRoutes;
