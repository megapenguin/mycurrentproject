import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

function LoginProtectedRoutes({ component: Component, Auth, history, res }) {
  return (
    <Route
      {...res}
      render={(props) =>
        Auth.state.isAuthenticated &&
        Auth.state.userData.myStatus == "admin" ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component />
        )
      }
    />
  );
}

export default withRouter(LoginProtectedRoutes);
