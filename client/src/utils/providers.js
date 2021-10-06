import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

const Providers = ({ children }) => {
    
    const [notificationsSettings, setNotificationsSettings] = useState({sound: true, volume: 0  });

    return (
        <SettingsContext.Provider value={{notificationsSettings, setNotificationsSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};

export default Providers;