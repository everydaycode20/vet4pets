import React, {memo, useEffect, useState} from "react";

import "./styles/calendar-months.css";

const CalendarMonths = memo(({ setNewMonth, daysInMonth }) => {

    const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        console.log("mounted month");
        return () => {
            setIsMounted(false);
            console.log("unmounted month");
        }
    }, []);

    const getMonth = (index) => {
        setNewMonth( prev => ({...prev, month: index, view: true}) )
    };

    return (
        <div className="calendar-months-container" mount={isMounted.toString()}>
            {months.map((month, index) => {

                let currentMonth = month === months[new Date().getMonth()] && daysInMonth[16].year === new Date().getFullYear();

                return (
                    <button type="button" className="btn-month" style={{border: currentMonth && "1px solid black"}} key={index} onClick={() => getMonth(index)}>{month.substring(0, 3)}</button>
                )
            })}
        </div>
    );
});

export default CalendarMonths;