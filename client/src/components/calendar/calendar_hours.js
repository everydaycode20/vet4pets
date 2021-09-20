import React, { useState, useEffect} from "react";

import "./styles/calendar_hours.css";

const CalendarHours = ({ setDate, setCalendar, setBtnActive, date }) => {

    const [hours, setHours] = useState([]);

    const setAppointment = (hour) => {
        setDate(prev => ({...prev, "hour": hour}));
        setCalendar(false);
        setBtnActive(prev => ({...prev, step4: true}));
    };

    useEffect(() => {
        
        fetch("/appointments/day/hours", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"date": `${date.year}-${date.monthIndex}-${date.date}`})
        }).then(res => res.json()).then(data => {
            
            setHours(data.hours);
            
        }).catch(err => console.log(err));

    }, []);

    return (
        <div className="calendar-hours-container">
            {hours.map((hour, index) => {

                return (
                    <button key={index} className="btn-hour" type="button" onClick={() => setAppointment(hour)}>{hour}</button>
                )
            })}
        </div>
    );
};

export default CalendarHours;