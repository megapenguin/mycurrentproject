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
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./views/AdminDashboard";
import BarangaysTableListContent from "./views/BarangaysTableListContent";
import DriversTableListContent from "./views/DriversTableListContent";
import JeepneysTableListContent from "./views/JeepneysTableListContent";
import UsersTableListContent from "./views/UsersTableListContent";
import AssignJeepneyDriverDashboard from "./views/AssignJeepneyDriverDashboard";
import FunFactsTableListContents from "./views/FunFactsTableListContents";

function App() {
  let Auth = useContext(AuthContext);
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
            <MainProtectedRoutes
              Auth={Auth}
              path="/"
              layout={AdminLayout}
              component={AdminDashboard}
              exact
            />
            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/barangay-list"
              component={BarangaysTableListContent}
              exact
            />
            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/driver-list"
              component={DriversTableListContent}
              exact
            />
            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/jeepney-list"
              component={JeepneysTableListContent}
              exact
            />
            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/assigned-driver"
              component={AssignJeepneyDriverDashboard}
              exact
            />
            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/users-list"
              component={UsersTableListContent}
              exact
            />
            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/funfacts-list"
              component={FunFactsTableListContents}
              exact
            />
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
