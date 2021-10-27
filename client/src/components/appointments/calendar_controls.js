import React, { useState, useEffect } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

import styles from "../../styles/appointment/appointments.module.scss";

const CalendarControls = ({ getPrevWeek, week, getNextWeek, currentYear, addAppointments, calendarView, month, setNewMonth, newMonth, setNewWeek }) => {

    const [currentWeek, setCurrentWeek] = useState(true);
    
    useEffect(() => {
        
        const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

        setCurrentWeek(week && ( ( new Date().getDate() < week[0].date || new Date().getDate() > week[4].date ) || (week[0].year !== new Date().getFullYear()) || (week[0].month !== months[new Date().getMonth()])));

    }, [week]);

    return (
        <div className={styles.calendar_control}>

            {calendarView === "weekly" &&
                <div className={styles.dates_control}>

                    <button onClick={() => getPrevWeek()}><img style={{transform: "rotateY(180deg)"}} src={ArrowLeft} alt="previous" /></button>

                    {week && <span>{week[0].month.substring(0,3)} {week[0].date}-{week[4].month.substring(0,3)} {week[4].date}</span>}

                    <button type="button" onClick={() => getNextWeek()}><img src={ArrowLeft} alt="next" /></button>
                </div>
            }

            {calendarView === "monthly" &&
                <div className={styles.dates_control}>
                    <button onClick={() => setNewMonth(prev => ({...prev, month: newMonth.month - 1}))}><img style={{transform: "rotateY(180deg)"}} src={ArrowLeft} alt="previous" /></button>
                    
                    {month.length > 0 && <span>{ month[Math.floor(month.length/2)].month }</span>}

                    <button onClick={() => setNewMonth(prev => ({...prev, month: newMonth.month + 1}))} type="button" ><img src={ArrowLeft} alt="next" /></button>
                </div>
            }

            {calendarView === "weekly" && <span>{ currentYear }</span>}

            {month.length > 0 && calendarView === "monthly" && <span>{ month[Math.floor(month.length/2)].year }</span>}

            { ( (currentWeek && calendarView === "weekly") || (newMonth.month !== new Date().getMonth() && calendarView === "monthly") )  && <button onClick={() => calendarView === "weekly" ? setNewWeek({ "day": new Date().getDate(), "dayInWeek": new Date().getDay() }) : setNewMonth({month: new Date().getMonth() })}>Today</button>}

            <button className="btn-add-app" onClick={(e) => addAppointments(e.target)}>Schedule Appointment</button>
        </div>
    );
};

export default CalendarControls;