import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

function MainProtectedRoutes({
  layout: Layout,
  component: Component,
  Auth,
  history,
  res,
}) {
  return (
    <Route
      {...res}
      render={(props) =>
        Auth.state.isAuthenticated &&
        Auth.state.userData.myStatus == "admin" ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default withRouter(MainProtectedRoutes);
