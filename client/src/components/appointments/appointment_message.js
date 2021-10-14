import React from "react";

import { message } from "../../styles/appointment/appointments.module.scss";

const AppointmentMessage = ({ setAppMessage, msg }) => {

    return (
        <div className={message} onAnimationEnd={() => setAppMessage(false)}>
            <span>{msg}</span>
        </div>
    );
};

export default AppointmentMessage;