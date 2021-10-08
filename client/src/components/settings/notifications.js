import React, { useState, useContext } from "react";

import Check from "../../assets/check_.svg";
import Close from "../../assets/close_.svg";

import { SettingsContext } from "../../utils/providers";

import styles from "../../styles/settings/notifications.module.scss";

const Notifications = () => {
    
    const soundBtns = ["Low", "Medium", "High"];

    const { notificationsSettings, setNotificationsSettings } = useContext(SettingsContext);
    
    return (
        <div className={styles.container}>
            <h2>Notifications</h2>
            <div>
                <label htmlFor="toggle" className={styles.toggle}>
                    Active sound on notifications
                    <input type="checkbox" name="toggle" id="toggle" className={styles.sound_toggle} value="true" checked={notificationsSettings.sound} onChange={() => setNotificationsSettings(prev => ({...prev, sound: !notificationsSettings.sound}))} />
                    <span className={styles.toggle_display} hidden>
                        <img src={Check} alt="check" aria-hidden="true" className={styles.toggle_icon}/>
                        <img src={Close} alt="check" aria-hidden="true" className={styles.toggle_icon}/>
                    </span>
                </label>
            </div>
            <div className={styles.volume}>
                <span>Sound volume</span>
                <div>
                    {soundBtns.map((item, index) => {

                        return <button key={index} style={{backgroundColor: notificationsSettings.volume === index ? "#3A6351": "#CDF0EA", color: notificationsSettings.volume === index ? "white" : "#3A6351"}} onClick={() => setNotificationsSettings(prev => ({...prev, volume: index}))}>{item}</button>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Notifications;