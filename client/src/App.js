import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import SideBar from "./components/sidebar.js/sidebar";
import Main from "./components/home/home";
import Appointments from "./components/appointments/appointments";

import "./styles/app.scss";

function App() {

  let location = useLocation();

  return (
      <main className="main-container">
        <SideBar />
        <section className="content-container">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/appointments">
              <Appointments />
            </Route>
          </Switch>
        </section>
      </main>
  );
}

export default App;
