import React, { useState, useEffect, useContext, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  ProtectedRoute,
  Link,
} from "react-router-dom";

import LoginProtectedRoutes from "./components/ProtectedRoutes/LoginProtectedRoutes";
import AdminProtectedRoutes from "./components/ProtectedRoutes/AdminProtectedRoutes";
import MainProtectedRoutes from "./components/ProtectedRoutes/MainProtectedRoutes";

import { AuthContext } from "./components/GlobalContext/AuthContext";

import { Admin } from "./views";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  let Auth = useContext(AuthContext);
  console.log(Auth);

  return (
    <React.Fragment>
      {!Auth.state.isLoading && (
        <Router>
          <Switch>
            <LoginProtectedRoutes
              Auth={Auth}
              path="/login"
              component={Login}
              exact
            />
            <MainProtectedRoutes Auth={Auth} path="/" component={Admin} exact />
            <LoginProtectedRoutes
              Auth={Auth}
              path="/register"
              component={Register}
              exact
            />
            <Route component={() => <h1>URL NOT FOUND</h1>} />
          </Switch>
        </Router>
      )}
    </React.Fragment>
  );
}

export default App;
