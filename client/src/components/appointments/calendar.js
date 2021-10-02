import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Delete from "../../assets/delete_outline.svg";
import DotBtn from "../misc/dot_btn";

const AppointmentCard = ({ item, border, index, deleteCard }) => {
    
    return (                 
        <div style={{backgroundColor: item.appointmentName !== "" && "white", borderTop: border}} className="appointment-card">
            <span>{item.nameOwner}</span>
            <span>{item.namePet}</span>
            <span>{item.appointmentName}</span>
            <span>{item.time}</span>
            <DotBtn id={item.id}>
                <div className="app-options">
                    <Link to={`/owner/${index}`}> <img src={Edit} alt="edit"/> Edit</Link>
                    <button className="btn-delete-card" onClick={() => deleteCard(item.id, item.idDB)}> <img src={Delete} alt="delete" />Delete</button>
                </div>
            </DotBtn>
        </div>
    );
};

const Calendar = ({ week, addAppointments, setAppointmentsWeek, appointmentsWeek }) => {

    const [showOptions, setShowOptions] = useState(null);

    const arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"];
    
    const [markTop, setMarkTop] = useState({"minutes": 0});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (week) {
            
            fetch("/appointments/day-week", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({"date1": `${week[0].year}-${week[0].monthIndex}-${week[0].date}`, "date2": `${week[4].year}-${week[4].monthIndex}-${week[4].date}`})
            }).then(res => res.json()).then(data => {
                
                setAppointmentsWeek(data.appointmentsWeek);
                
                setLoading(false);

            }).catch(err => console.log(err));
        }
    }, [week]);
    
    useEffect(() => {

        const currentTimeInMinutes =   Math.floor((new Date().getTime()/1000)/60);
                
        const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 17:00`;

        const lastTimeInMinutes = Math.floor((new Date( currentDate ).getTime()/1000)/60);

        const time = Math.floor((540 - (lastTimeInMinutes - currentTimeInMinutes)) * 6.66);

        function getMinutes() {

            const currentTimeInMinutes =   Math.floor((new Date().getTime()/1000)/60);
                
            const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 17:00`;

            const lastTimeInMinutes = Math.floor((new Date( currentDate ).getTime()/1000)/60);
            
            // setMarkTop( Math.floor((540 - (lastTimeInMinutes - currentTimeInMinutes)) * 6.66) );

            if (time > 3590) {
                
                setMarkTop(prev => ({...prev, minutes: 3590}));
            }
            else{
                setMarkTop(prev => ({...prev, minutes: Math.floor((540 - (lastTimeInMinutes - currentTimeInMinutes)) * 6.66)}));
            }
            

            setTimeout(() => {
                getMinutes();
                
            }, 60000);

        }

        getMinutes();
            
        return () => getMinutes();
        
    }, []);
    
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
            {loading ? <div className="inner-calendar-container"></div> :
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

                <div className="appointment-container">
                    <div className="mark-container" style={{top: markTop.minutes}}>
                        <div className="mark-dot"/>
                        <div className="hour-mark"/>
                    </div>
                    
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
                                        <div key={item.id} style={{cursor: item.appointmentName !== "" && "default"}} className="hour-item" onClick={(e) => addAppointments(e.target, item.time, item.dateDay, item.day, item.month, item.year, item.monthIndex)} >

                                            {item.appointmentName !== "" && <AppointmentCard item={item} border={border} setShowOptions={setShowOptions} getOptions={getOptions} index={item.id} deleteCard={deleteCard}/>}
                                            {/* { showOptions === item.id && 
                                                <div className="app-options">
                                                    <Link to={`/owner/${index}`}> <img src={Edit} alt="edit"/> Edit</Link>
                                                    <button className="btn-delete-card" onClick={() => deleteCard(item.id, item.idDB)}> <img src={Delete} alt="delete" />Delete</button>
                                                </div>} */}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );

};

export default Calendar;