import React from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

const CalendarControls = ({ getPrevWeek, week, getNextWeek, currentYear, addAppointment }) => {

    return (
        <div className="calendar-control">
            <div className="dates-control">
                <button onClick={() => getPrevWeek()}><img style={{transform: "rotateY(180deg)"}} src={ArrowLeft} alt="previous" /></button>
                {week && <span>{week[0].month.substring(0,3)} {week[0].date}-{week[6].month.substring(0,3)} {week[6].date}</span>}
                <button onClick={() => getNextWeek()}><img src={ArrowLeft} alt="next" /></button>
            </div>
            <span>{currentYear}</span>
            <button onClick={() => addAppointment()}>Schedule Appointment</button>
        </div>
    );
};

export default CalendarControls;