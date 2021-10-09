import React from "react";

import { message } from "../../styles/appointment/appointments.module.scss";

const AppointmentMessage = ({ setAppMessage }) => {

    return (
        <div className={message} onAnimationEnd={() => setAppMessage(false)}>
            <span>Appointment created</span>
        </div>
    );
};

export default AppointmentMessage;