import React, { useState, useEffect } from "react";

const Appointments = ( { appointmentsType, upcomingAppointments, pastAppointments }) => {

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    if (appointmentsType === "upcoming" ) {
        
        return (
            <ul className="list">
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
            <ul className="list">
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

    useEffect(() => {
        
        fetch("/appointments/owner/upcoming", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"id_owner": id})
        }).then(res => res.json()).then(data => {
            
            setUpcomingAppointments(data);
            
        }).catch(err => console.log(err));

    }, []);

    const getPastAppointments = () => {

        setAppointmentsType("past");

        fetch("/appointments/owner/past", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"id_owner": id})
        }).then(res => res.json()).then(data => {
            
            setPastAppointments(data);
            

        }).catch(err => console.log(err));

        
    };

    return (
        <div className="profile-appointments">
            <div className="btn-container">
                <button style={{backgroundColor: appointmentsType === "upcoming" ? "#135A5A" : "#CDF0EA", color: appointmentsType === "upcoming" ? "white" : "#3A6351"}} onClick={() => setAppointmentsType("upcoming")}>upcoming appointments</button>
                <button style={{backgroundColor: appointmentsType === "past" ? "#135A5A" : "#CDF0EA", color: appointmentsType === "past" ? "white" : "#3A6351"}} onClick={() => getPastAppointments()}>past appointments</button>
            </div>
            <div className="appointments-type-container">
                <Appointments appointmentsType={appointmentsType} upcomingAppointments={upcomingAppointments} pastAppointments={pastAppointments}/>
            </div>
        </div>
    );

};

export default ProfileAppointments;