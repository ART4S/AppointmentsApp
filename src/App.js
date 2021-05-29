/* eslint-disable no-confusing-arrow */
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { flowRight as compose } from "lodash";

import store from "redux/store";

import Login from "pages/Login/Login";
import Home from "pages/Home/Home";
import Appointments from "pages/Appointments/Appointments";
import Events from "pages/Events/Events";
import Notifications from "pages/Notifications/Notifications";
import NotFound from "pages/NotFound/NotFound";

import { withAuth } from "common/hooks/useAuth";
import { withTheme } from "common/hooks/useTheme";
import { withLocalization } from "common/hooks/useLocalization";

import AuthRoute from "common/components/AuthRoute/AuthRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>

        <AuthRoute path="/" exact>
          <Home />
        </AuthRoute>

        <AuthRoute path="/appointments">
          <Appointments />
        </AuthRoute>

        <AuthRoute path="/events">
          <Events />
        </AuthRoute>

        <AuthRoute path="/notifications">
          <Notifications />
        </AuthRoute>

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

function withStore(Component) {
  return function WithStore(props) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
}

export default compose(withLocalization, withAuth, withTheme, withStore)(App);
