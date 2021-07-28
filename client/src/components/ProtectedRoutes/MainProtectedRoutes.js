import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

function MainProtectedRoutes({
  layout: Layout,
  component: Component,
  Auth,
  res,
}) {
  return (
    <Route
      {...res}
      render={(props) =>
        Auth.state.isAuthenticated && Auth.state.userData.myStatus == "user" ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default MainProtectedRoutes;
