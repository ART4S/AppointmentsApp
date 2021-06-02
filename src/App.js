/* eslint-disable no-confusing-arrow */
import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { flowRight as compose } from "lodash";

import store from "redux/store";

import Login from "pages/Login/Login";
import UserProfile from "pages/UserProfile/UserProfile";
import Home from "pages/Home/Home";
import Appointments from "pages/Appointments/Appointments";
import Events from "pages/Events/Events";
import Notifications from "pages/Notifications/Notifications";
import NotFound from "pages/NotFound/NotFound";

import { withAuth } from "common/hooks/useAuth";
import { withTheme } from "common/hooks/useAppTheme";
import { withLocalization } from "common/hooks/useLocalization";

import AuthRoute from "common/components/AuthRoute/AuthRoute";

function App() {
  return (
    <Router forceRefresh>
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

        <AuthRoute path="/profile">
          <UserProfile />
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
