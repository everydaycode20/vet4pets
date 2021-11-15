import React, { useState, useEffect } from "react";

import styles from "../../styles/appointment/day_view.module.scss"

const DayView = ( { day } ) => {
    
    const [appointmentsList, setAppointmentsList] = useState([]);

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    useEffect(() => {
        
        fetch("/appointments/current_day", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"date": `${day.year}-${ day.numberMonth + 1 }-${day.day}`})
        }).then(res => res.json()).then(data => {

            setAppointmentsList(data);
            
        }).catch(err => console.log(err));

    }, [day]);

    return (
        <div className={styles.container}>

            <div className={styles.inner_calendar}>

                <div className={styles.day_view}>
                    
                    <div className={styles.hours_container}>
                        
                        {hours.map((hour, index) => {

                            return <span key={index}>{hour}</span>
                            
                        })}

                    </div>

                    <div className={styles.appointment_list}>
                        {appointmentsList.map(elm => {

                            return (
                                elm.appointmentName !== "" ? 
                                    <div key={elm.id} style={{backgroundColor: elm.color}} className={styles.appointment}>
                                        <span>{elm.appointmentName}</span>
                                        <span>{elm.namePet}</span>
                                        <span>{elm.nameOwner}</span>
                                    </div> :
                                    <div key={elm.id} className={styles.appointment}>
                                    
                                    </div>
                                
                            );
                        })}
                    </div>

                </div>

            </div>
            
        </div>
    );

};

export default DayView;