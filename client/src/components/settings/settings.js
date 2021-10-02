import React, { useContext } from "react";

import Header from "./header";
import Notifications from "./notifications";

import "../../styles/settings/settings.scss";
import "../../styles/settings/notifications.scss";

const Settings = () => {

    return (
        <div className="main-settings-container">
            <Header />
            <div className="settings-inner-container">
                <Notifications />
            </div>
        </div>
    );
};

export default Settings;