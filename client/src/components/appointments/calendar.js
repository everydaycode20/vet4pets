import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Delete from "../../assets/delete_outline.svg";
import DotBtn from "../misc/dot_btn";
import { TimeSettings } from "../../utils/providers";


import getCookie from "../../utils/getCookie";

import styles from "../../styles/appointment/appointments.module.scss";

export const AppointmentCard = ({ item, border, index, deleteCard }) => {
    
    

    const dates = item.fullDate.split(" ");
    console.log(dates);
    console.log( new Date(dates[0].split("-")[0], dates[0].split("-")[1], dates[0].split("-")[2], dates[1].split(":")[0], dates[1].split(":")[1]) );
    return (                 
        <div style={{backgroundColor: item.appointmentName !== "" && "white", borderTop: border, top: 0}} className={styles.card}>
            <span>{item.nameOwner}</span>
            <span>{item.namePet}</span>
            <span>{item.appointmentName}</span>
            <span>{item.time}</span>
            <DotBtn id={item.id} rotate={true} >
                <div className={styles.app_options}>
                    <Link to={{pathname: `/appointments/edit/${index}`, state: item } } > <img src={Edit} alt="edit"/> Edit</Link>
                    <button className={styles.delete} onClick={() => deleteCard(item.id, item.idDB)}> <img src={Delete} alt="delete" />Delete</button>
                </div>
            </DotBtn>
        </div>
    );
};

const Calendar = ({ week, addAppointments, setAppointmentsWeek, appointmentsWeek, setMakeAppointment }) => {

    const { timeFormat } = useContext(TimeSettings);

    const [showOptions, setShowOptions] = useState(null);

    const arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"];
    
    const [markTop, setMarkTop] = useState({"minutes": 0});

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

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

        const cookie = getCookie("csrfToken");

        fetch("/appointment", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "CSRF-TOKEN": cookie
            },
            body: JSON.stringify({id: idDB})
        }).then(res =>{ 
            
            if (!res.ok) {
                setError(true);
            }
            else{
                return res.json()
            }
            
        }).then(data => {
            

            
        }).catch(err => console.log(err));

        setShowOptions(null);
    };

    if (error) {
        
        return <Redirect to="/login"/>
    };
    
    return (
        <div className={styles.calendar}>
            
            {loading ? <div className={styles.inner_calendar}></div> :
            <div className={styles.inner_calendar}>
                <div className={styles.week_days}>
                    {week && week.map((day, index) => {
                        
                        const condition = day.year === new Date().getFullYear() && day.date === new Date().getDate() && day.month === months[new Date().getMonth()];

                        return (
                            <div key={index} className={styles.date}>
                                {condition && <div className={styles.current_day}></div>}
                                <span >{day.date} </span>
                                <span>{day.day}</span>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.container_calendar}>
                    <div className={styles.mark_container} style={{top: markTop.minutes}}>
                        <div className={styles.mark_dot}/>
                        <div className={styles.hour_mark}/>
                    </div>
                    
                    <div className={styles.hours_container}>
                        {hours.map((hour, index) => {

                            let h = parseInt(hour.split(":")[0]);
                            let minutes = hour.split(":")[1];
                            
                            if (index > Math.floor(hours.length / 2) && timeFormat === "24 hours") hour = `${h + 12}:${minutes}`;

                            return <span key={index}>{hour}</span>
                            
                        })}
                    </div>
                    {appointmentsWeek.map((item, index) => {
                        
                        return (
                            <div key={Math.random()} className={styles.day_container}>
                                
                                {item[arr[index]].map( item => {
                                    
                                    let hour = parseInt(item.time.split(":")[0]);
                                    let minutes = item.time.split(":")[1];

                                    if (hour > 12 && timeFormat === "12 hours") item.time = `0${hour - 12}:${minutes}`;

                                    return (
                                        <div key={item.id} style={{cursor: item.appointmentName !== "" && "default"}} className={styles.hour_item} onClick={(e) => addAppointments(e.target, item.time, item.dateDay, item.day, item.month, item.year, item.monthIndex)} >

                                            {item.appointmentName !== "" && <AppointmentCard item={item} border={`4px solid ${item.color}`} setShowOptions={setShowOptions} getOptions={getOptions} index={item.id} deleteCard={deleteCard} setMakeAppointment={setMakeAppointment}/>}
                                            
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