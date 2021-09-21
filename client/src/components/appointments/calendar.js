import React, { useState, useEffect, memo, useRef } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Delete from "../../assets/delete_outline.svg";

const AppointmentCard = ({ item, border, getOptions, index }) => {

    return (                 
        <div style={{backgroundColor: item.appointmentName !== "" && "white", borderTop: border}} className="appointment-card">
            <span>{item.nameOwner}</span>
            <span>{item.namePet}</span>
            <span>{item.appointmentName}</span>
            <span>{item.time}</span>
            <button className="dot-container" onClick={() => getOptions(index)}>
                <div className="dot"/>
                <div className="dot"/>
                <div className="dot"/>
            </button>
        </div>
    );
}

const Calendar = ({ week, addAppointment, setAppointmentsWeek, appointmentsWeek }) => {

    const [showOptions, setShowOptions] = useState(null);

    const arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"];
    
    // const [appointmentsWeek, setAppointmentsWeek] = useState([]);

    useEffect(() => {

        if (week) {

            fetch("/appointments/day-week", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({"date1": `${week[0].year}-${week[0].monthIndex}-${week[0].date}`, "date2": `${week[4].year}-${week[4].monthIndex}-${week[4].date}`})
            }).then(res => res.json()).then(data => {
                
                setAppointmentsWeek(data.appointmentsWeek);
                
            }).catch(err => console.log(err));
        }
    }, [week]);
    
    const getOptions = (index) => {
        
        setShowOptions(index);

        if (showOptions !== null) {
            setShowOptions(null);
        }
    };
    
    const deleteCard = (index, idDB) => {

        let data = JSON.parse(JSON.stringify(appointmentsWeek));

        let newObj = data.map((elm, i) => {
            
            return {[arr[i]]: elm[arr[i]].map(item => {
                
                if (item.id === index) {
                    item.appointmentName = "";
                    item.fullDate = "";
                    item.idDB = "";
                    item.nameOwner = "";
                    item.namePet = "";
                    
                }
                return item;
            })};
        });
        
        setAppointmentsWeek(newObj);

        fetch("/appointment", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: idDB})
        }).then(res => res.json()).then(data => {
            
            
            
        }).catch(err => console.log(err));

        setShowOptions(null);
    };

    return (
        <div className="main-calendar-container">
            <div className="inner-calendar-container">
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
                {/* <div className="empty"></div> */}

                <div className="appointment-container">
                    <div className="hours-container">
                        {hours.map((hour, index) => {

                            return <span key={index}>{hour}</span>
                        })}
                    </div>
                    {appointmentsWeek.map((item, index) => {
                        
                        return (
                            <div key={Math.random()} className="day-container">
                                
                                {item[arr[index]].map((item, index) => {
                                    
                                    let border = null;
                                    
                                    if (item.appointmentName === "general checkup") border = "4px solid red";
                                    if (item.appointmentName === "vaccine") border = "4px solid blue";

                                    return (
                                        <div key={item.id} style={{cursor: item.appointmentName !== "" && "default"}} className="hour-item" onClick={(e) => addAppointment(e.target, item.time, item.dateDay, item.day, item.month, item.year, item.monthIndex)} >

                                            {item.appointmentName !== "" && <AppointmentCard item={item} border={border} setShowOptions={setShowOptions} getOptions={getOptions} index={item.id}/>}
                                            { showOptions === item.id && 
                                                <div className="app-options">
                                                    <Link to={`/owner/${index}`}> <img src={Edit} alt="edit"/> Edit</Link>
                                                    <button className="btn-delete-card" onClick={() => deleteCard(item.id, item.idDB)}> <img src={Delete} alt="delete" />Delete</button>
                                                </div>}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

};

export default Calendar;