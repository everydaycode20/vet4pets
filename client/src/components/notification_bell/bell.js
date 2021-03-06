import React, { useState, useEffect } from "react";

import BellIcon from "../../assets/bell_filled.svg";
import useAudio from "../../utils/useAudio";

import styles from "../../styles/bell.module.scss";
import "../../styles/bell_anim.scss";

const Bell = ({ socket }) => {
    
    const [notification, setNotification] = useState(false);

    const [appointment, setAppointment] = useState(null);

    const [showAppointment, setShowAppointment] = useState(false);

    const [playing, toggle, audio] = useAudio();

    useEffect(() => {
    
        if (socket) {
            
            socket.on("appointments", (obj) => {
                // console.log("got message bell", JSON.parse(obj));
                setNotification(true);
                setAppointment( JSON.parse(obj) );
                toggle();
            });
        }
        
        return () => socket && socket.close();
    
    }, [socket])
    
    const showNotification = () => {
        
        setNotification(false);

        setShowAppointment(!showAppointment);

    };
    
    return (
        <div className={styles.container} >
            <button className="bell" onClick={() => showNotification()}  notification={notification.toString()}>
                <img src={BellIcon} alt="notification"/>
            </button>
            
            {notification && <div className={styles.red_dot} />}

            {showAppointment && appointment  && 
                <ul className={styles.dropdown} >
                    <li>{appointment.nameOwner}</li>
                    <li>{appointment.namePet}</li>
                    <li>{appointment.appointmentName}</li>
                    <li>{appointment.hour}:{appointment.minute}</li>
                </ul>
            }
        </div>
    );

};

export default Bell;