import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import io from "socket.io-client";

import useSocket from "./utils/useSocket";

import SideBar from "./components/sidebar.js/sidebar";
import Main from "./components/home/home";
import Appointments from "./components/appointments/appointments";
import MedicalRecords from "./components/medical_records/medical_records";
import Owner from "./components/owner/owner";
import Pet from "./components/pet/pet";
import Miscellaneous from "./components/miscellaneous/miscellaneous";
import OwnerProfile from "./components/owner_profile/owner_profile";
import PetProfile from "./components/pet_profile/pet_profile";
import Bell from "./components/notification_bell/bell";

import "./styles/app.scss";

function App() {

  const socket = useSocket(io);

  

  return (
      <main className="main-container">
        <SideBar />

        <section className="content-container">
        <Bell socket={socket}/>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/appointments">
              <Appointments socket={socket}/>
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
            {/* <Route path="/owner/:id" children={<OwnerProfile/>}>
            </Route> */}
            <Route path="/pet/:id" children={<PetProfile/>}>
            </Route>
            <Route path="/miscellaneous">
              <Miscellaneous />
            </Route>
          </Switch>
        </section>
      </main>
  );
}

export default App;
