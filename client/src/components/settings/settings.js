import React, { useContext } from "react";
import { Link, Switch, Router, Route } from "react-router-dom";

import Header from "./header";
import Notifications from "./notifications";
import Miscellaneous from "./miscellaneous";
import AppointmentType from "./appointment_type";

import "../../styles/settings/settings.scss";

const Settings = () => {

    return (
        <div className="main-settings-container">
            <Header />
            <div className="settings-inner-container">
                <Notifications />
                <Miscellaneous />
            </div>
            <Switch>
                <Route path="/settings/appointments">
                    <AppointmentType />
                </Route>
            </Switch>

        </div>
    );
};

export default Settings;