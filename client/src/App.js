import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import io from "socket.io-client";

import useSocket from "./utils/useSocket";

import SideBar from "./components/sidebar/sidebar";
import Main from "./components/home/home";
import Appointments from "./components/appointments/appointments";
import MedicalRecords from "./components/medical_records/medical_records";
import Owner from "./components/owner/owner";
import Pet from "./components/pet/pet";
import PetProfile from "./components/pet_profile/pet_profile";
import Bell from "./components/notification_bell/bell";
import Menu from "./components/sidebar/menu";
import Settings from "./components/settings/settings";

import Providers from "./utils/providers";

import "./styles/app.scss";

function App() {

  const socket = useSocket(io);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Providers>
        <main className="main-container">

          <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
          <Menu setShowSidebar={setShowSidebar}/>

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

              <Route path="/pet/:id" children={<PetProfile/>}>
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </section>
        </main>
      </Providers>
  );
}

export default App;
