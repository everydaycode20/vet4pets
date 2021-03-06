import React, { useState, useEffect } from "react";

import Skeleton from "../misc/skeleton";

import styles from "../../styles/owner/owner_profile.module.scss";

const Appointments = ( { appointmentsType, upcomingAppointments, pastAppointments }) => {

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    if (appointmentsType === "upcoming" ) {
        
        return (
            <ul className={styles.list}>
                {upcomingAppointments.map(item => {

                    return (
                        <li key={item.id}>
                            <span>{item.day} {months[item.month - 1].substring(0, 3)}'{item.year.toString().substring(2,4)}</span>
                            <span>{item.time}</span>
                            <div />
                            <span>{item.appointmentName}</span>
                            <span>{item.nameOwner}</span>
                            <span>{item.namePet}</span>
                        </li>
                    )
                })}
            </ul>
        );
    }

    if (appointmentsType === "past") {

        return (
            <ul className={styles.list}>
                {pastAppointments.map(item => {

                    return (
                        <li key={item.id}>
                            <span>{item.day} {months[item.month - 1].substring(0, 3)}'{item.year.toString().substring(2,4)}</span>
                            <span>{item.time}</span>
                            <div />
                            <span>{item.appointmentName}</span>
                            <span>{item.nameOwner}</span>
                            <span>{item.namePet}</span>
                        </li>
                    )
                })}
            </ul>
        );
    }

    
};

const ProfileAppointments = ({ id }) => {

    const [appointmentsType, setAppointmentsType] = useState("upcoming");

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const [pastAppointments, setPastAppointments] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {
        setLoading(true);
        fetch("/appointments/owner/upcoming", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"id_owner": id})
        }).then(res => res.json()).then(data => {
            
            setUpcomingAppointments(data);

            setLoading(false);

        }).catch(err => console.log(err));

    }, []);


    const getPastAppointments = () => {

        setAppointmentsType("past");

        if (pastAppointments.length === 0) {

            setLoading(true);

            fetch("/appointments/owner/past", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({"id_owner": id})
            }).then(res => res.json()).then(data => {
                
                setPastAppointments(data);
                
                setLoading(false);

            }).catch(err => console.log(err));
        }

    };

    return (
        <div className={styles.appointments}>
            <div className={styles.btn_container}>
                <button style={{backgroundColor: appointmentsType === "upcoming" ? "#135A5A" : "#CDF0EA", color: appointmentsType === "upcoming" ? "white" : "#3A6351"}} onClick={() => setAppointmentsType("upcoming")}>upcoming appointments</button>
                <button style={{backgroundColor: appointmentsType === "past" ? "#135A5A" : "#CDF0EA", color: appointmentsType === "past" ? "white" : "#3A6351"}} onClick={() => getPastAppointments()}>past appointments</button>
            </div>
            <div className={styles.type_appointments}>
                {loading ? <Skeleton height={41} backgroundColor={"#CDF0EA"} number={3} width={100}/> : 
                <Appointments appointmentsType={appointmentsType} upcomingAppointments={upcomingAppointments} pastAppointments={pastAppointments}/>
                }
            </div>
        </div>
    );

};

export default ProfileAppointments;