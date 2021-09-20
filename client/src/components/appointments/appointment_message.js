import React, { useEffect } from "react";

const AppointmentMessage = ({ setAppMessage }) => {

    useEffect(() => {

        setTimeout(() => {
            setAppMessage(false);
        }, 1700);

    }, []);

    return (
        <div className="appointment-message">
            <span>Appointment created</span>
        </div>
    );
};

export default AppointmentMessage;