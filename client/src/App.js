import React, { useContext } from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginProtectedRoutes from "./components/ProtectedRoutes/LoginProtectedRoutes";
import MainProtectedRoutes from "./components/ProtectedRoutes/MainProtectedRoutes";

import { AuthContext } from "./components/GlobalContext/AuthContext";

import { Admin } from "./views";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./views/AdminDashboard";

import InstructionListContent from "./views/InstructionListContent";
import ProfileContent from "./views/ProfileContent";

function App() {
  let Auth = useContext(AuthContext);

  return (
    <React.Fragment>
      {!Auth.state.isLoading && (
        <Router>
          <Switch>
            <LoginProtectedRoutes
              Auth={Auth}
              path="/"
              component={Login}
              exact
            />
            <MainProtectedRoutes
              Auth={Auth}
              path="/instructions"
              layout={AdminLayout}
              component={AdminDashboard}
              exact
            />

            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/instructions/:id"
              component={InstructionListContent}
              exact
            />

            <MainProtectedRoutes
              Auth={Auth}
              layout={AdminLayout}
              path="/profile"
              component={ProfileContent}
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
