import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SideBar from "./components/sidebar.js/sidebar";
import Main from "./components/main/main";

import "./styles/app.scss";

function App() {


  return (
    <Router>
      <main className="main-container">
        <SideBar />
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/appointments">
              <p>new route</p>
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
