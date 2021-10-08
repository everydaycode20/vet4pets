import React, {  } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./header";
import Notifications from "./notifications";
import Miscellaneous from "./miscellaneous";
import AppointmentType from "./appointment_type";
import Type from "./pet_type";

import styles from "../../styles/settings/settings.module.scss";

const Settings = () => {

    return (
        <div className={styles.main_container}>
            <Header />
            <div className={styles.inner_container}>
                <Notifications />
                <Miscellaneous />
            </div>
            <Switch>
                <Route path="/settings/appointments">
                    <AppointmentType />
                </Route>
                <Route path="/settings/type/pet">
                    <Type />
                </Route>
            </Switch>

        </div>
    );
};

export default Settings;