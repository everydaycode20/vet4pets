import React, { useState, useEffect } from "react";

import "./styles/calendar-days.css";

const CalendarDays = ({ daysInMonth, changeView, setDate, setHoursDay }) => {
    
    const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    const getDay = day => {
        
        let monthIndex = months.indexOf(day.month) + 1;
        setDate({"day": day.day, "date": day.date, "month": day.month, "monthIndex": monthIndex,"year": day.year});
        setHoursDay(true);
    };
    
    return (
        <div className="calendar-days-container" style={{gridTemplateRows: `repeat(${daysInMonth.length/7 + 1}, 30px)`}} mounted={isMounted.toString()} >
            
                {daysOfWeek.map((day, index) => {
                    return <span key={index}>{day.substring(0, 3)}</span>
                })}

            {daysInMonth.map((day, index) => {

                let currentDay = day.date === new Date().getDate() && day.month === months[new Date().getMonth()] && day.year === new Date().getFullYear() && !changeView;

                return (
                    <button key={index} className="day-item" onClick={() => getDay({"day": day.day, "date": day.date, "month": day.month, "year": day.year})} style={{backgroundColor: currentDay && "#bcbcbc"}}>

                        <span style={{color: day.currentMonth ? "black" : "#d8d8d8"}}>{day.date}</span>

                    </button>
                )
            })}
        </div>
    );

}

export default CalendarDays;