import React, { useState } from "react";
import { Link } from "react-router-dom";

import EditAppointment from "./edit_appointment";
import AppointmentMessage from "./appointment_message";

import styles from "../../styles/appointment/edit.module.scss";

const Edit = ({ setAppMessage, setMessageContent, appointmentsWeek, setAppointmentsWeek, socket }) => {

    return (
        <div className={styles.container}>
            
            <EditAppointment setAppMessage={setAppMessage} setMessageContent={setMessageContent} appointmentsWeek={appointmentsWeek} setAppointmentsWeek={setAppointmentsWeek} socket={socket} />

            <Link to="/appointments" className={styles.link}/>

        </div>
    ); 
};

export default Edit;