import React, {  } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./header";
import Notifications from "./notifications";
import Miscellaneous from "./miscellaneous";
import AppointmentType from "./appointment_type";
import Type from "./pet_type";
import Time from "./time";

import usePage from "../../utils/usePage";

import styles from "../../styles/settings/settings.module.scss";

const Settings = () => {
    
    usePage("settings");

    return (
        <div className={styles.main_container}>
            <Header />
            <div className={styles.inner_container}>
                <Notifications />
                <Miscellaneous />
                <Time />
            </div>
            <Switch>
                <Route path="/settings/appointments">
                    <AppointmentType />
                </Route>
                <Route path="/settings/type">
                    <Type />
                </Route>
            </Switch>

        </div>
    );
};

export default Settings;