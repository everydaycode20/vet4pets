import React, { useState, useEffect, memo } from "react";

const Calendar = ({ week }) => {
    
    const arr = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"];

    const getHour = (hour) => {
        console.log(hour);
    };

    // useEffect(() => {
    //     console.log("si");
    //     fetch("/appointments", {method: "GET"}).then(res => res.json()).then(data => {
            
    //         data.forEach(elm => {
    //             const time = new Date(elm.fecha)
    //             console.log(time.getHours(), time.getMinutes(), time.getSeconds());
    //             console.log(new Date(elm.fecha).toLocaleDateString());
    //         });
    //     });
    // }, []);


    useEffect(() => {
        
        const times = [{"date": "2021-09-13", "time": "10:30", "appointment": "general", "ownerName": "name last name", "petName": "akira"}]



        console.log(times);
    }, []);

    return (
        <div className="main-calendar-container">
                <div className="week-days">
                    {week && week.map((day, index) => {

                        const condition = day.year === new Date().getFullYear() && day.date === new Date().getDate() && day.month === months[new Date().getMonth()];

                        return (
                            <div key={index} className="date">
                                {condition && <div className="current-day"></div>}
                                <span >{day.date} </span>
                                <span>{day.day}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="empty"></div>
                <div className="hours-container">
                    {hours.map((hour, index) => {

                        return <span key={index}>{hour}</span>
                    })}
                </div>
                <div className="appointment-container">
                    
                    {arr.map((elm, index) => {
                        return (
                            <div key={index} className="day-container">
                                {hours.map((hour, index) => {

                                    return <div key={index} className="hour-item" onClick={() => getHour(hour)} ></div>
                                })}
                            </div>
                        )
                    })}
                </div>
                
        </div>
    );

};

export default Calendar;