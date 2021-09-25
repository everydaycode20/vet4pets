import React from "react";

const AppointmentMessage = ({ setAppMessage }) => {

    return (
        <div className="appointment-message" onAnimationEnd={() => setAppMessage(false)}>
            <span>Appointment created</span>
        </div>
    );
};

export default AppointmentMessage;