import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const TimeSettings = createContext();

const Providers = ({ children }) => {
    
    const [notificationsSettings, setNotificationsSettings] = useState({ sound: true, volume: 0 });

    const [timeFormat, setTimeFormat] = useState("24 hours");

    return (
        <SettingsContext.Provider value={{ notificationsSettings, setNotificationsSettings }}>
            <TimeSettings.Provider value={{ timeFormat, setTimeFormat }}>
                {children}
            </TimeSettings.Provider>
        </SettingsContext.Provider>
    );
};

export default Providers;