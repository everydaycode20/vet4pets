import React, { useState, useContext } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import io from "socket.io-client";

import useSocket from "./utils/useSocket";
import { ProvideAuth, AuthContext } from "./utils/useAuth";
import useOnline from "./utils/useOnline";

import SideBar from "./components/sidebar/sidebar";
import Main from "./components/home/home";
import Appointments from "./components/appointments/appointments";
import Owner from "./components/owner/owner";
import Pet from "./components/pet/pet";
import Bell from "./components/notification_bell/bell";
import Menu from "./components/sidebar/menu";
import Settings from "./components/settings/settings";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Profile from "./components/profile/profile";
import OwnerProfile from "./components/owner_profile/owner_profile";
import OnlineMessage from "./components/misc/online_message";

import Providers from "./utils/providers";

import styles from "./styles/app.module.scss";

const App = () => {
  
  const online = useOnline();
  
  const location = useLocation();

  const socket = useSocket(io);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ProvideAuth>
      <Providers>
          <main className={styles.main_container}>

            {!online && <OnlineMessage />}

            {!(location.pathname.startsWith("/login") || location.pathname.startsWith("/register")) && <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>}
            {!(location.pathname.startsWith("/login") || location.pathname.startsWith("/register")) && <Menu setShowSidebar={setShowSidebar}/>}

            <section className={styles.content_container}>

              {!(location.pathname.startsWith("/login") || location.pathname.startsWith("/register")) && <Bell socket={socket}/>}

              <Switch>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                  <Register />
                </Route>
                
                <Route path="/owners/:id">
                  <OwnerProfile />
                </Route>

                <ProtectedRoute exact path="/">
                  <Main />
                </ProtectedRoute>

                <ProtectedRoute path="/appointments">
                  <Appointments socket={socket}/>
                </ProtectedRoute>

                <ProtectedRoute path="/owners">
                  <Owner />
                </ProtectedRoute>

                <ProtectedRoute path="/pets">
                  <Pet />
                </ProtectedRoute>
                
                <ProtectedRoute path="/settings">
                  <Settings />
                </ProtectedRoute>

                <ProtectedRoute path="/profile">
                  <Profile />
                </ProtectedRoute>

              </Switch>
            </section>
          </main>
        </Providers>
      </ProvideAuth>
  );
};

const ProtectedRoute = ( { children, ...rest } ) => {

  const { auth } = useContext(AuthContext);
  
  return (
    <Route {...rest} render={ () => auth.authorized ? children : <Redirect to="/login" />} />
  );

};

export default App;
