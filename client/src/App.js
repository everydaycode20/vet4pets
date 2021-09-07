import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import SideBar from "./components/sidebar.js/sidebar";
import Main from "./components/home/home";
import Appointments from "./components/appointments/appointments";
import MedicalRecords from "./components/medical_records/medical_records";
import Owner from "./components/owner/owner";
import Pet from "./components/pet/pet";

import "./styles/app.scss";

function App() {

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
            <Route path="/records">
              <MedicalRecords />
            </Route>
            <Route path="/owners">
              <Owner />
            </Route>
            <Route path="/pets">
              <Pet />
            </Route>
          </Switch>
        </section>
      </main>
  );
}

export default App;
