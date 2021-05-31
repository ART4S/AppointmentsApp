/* eslint-disable no-confusing-arrow */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "common/hooks/useAuth";

export default function AuthRoute({ children, ...routeProps }) {
  const auth = useAuth();

  function render({ location }) {
    if (!auth.user) {
      return (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      );
    }

    return children;
  }

  return <Route {...routeProps} render={render} />;
}

AuthRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
