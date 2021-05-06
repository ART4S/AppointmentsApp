/* eslint-disable no-confusing-arrow */
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import store from "redux/store";

import Login from "pages/Login/Login";
import Home from "pages/Home/Home";
import Appointments from "pages/Appointments/Appointments";
import NotFound from "pages/NotFound/NotFound";

import useAuth, { ProvideAuth } from "common/hooks/useAuth";

function AuthRoute({ children, ...rest }) {
  const auth = useAuth();

  function render({ location }) {
    if (!auth.user) {
      return (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      );
    }

    return children;
  }

  return <Route {...rest} render={render} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />

      <ProvideAuth>
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

            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ProvideAuth>
    </Provider>
  );
}
