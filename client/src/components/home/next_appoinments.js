import React, { useState } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

const ListAppointment = ({ data }) => {

    return (
        <ul className="list-appointment">
            {data.map((item, index) => {

                return (
                    <li key={index}>
                        <span key={index}>{item.appointmentType}</span>
                        <div>
                            <span>{item.time}</span>
                            <span>{item.customer}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
};

const NextAppointments = () => {

    const [data, setData] = useState([{"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}]);

    const arr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const [date, setDate] = useState({ day: arr[new Date().getDay()], date: new Date().getDate(), month: new Date().getMonth() });
    
    const prevDay = () => {

        const year = new Date().getFullYear();

        const currentDate = new Date(year, date.month, date.date);

        currentDate.setDate(currentDate.getDate() - 1);

        setDate(prev => ({ ...prev, day: arr[currentDate.getDay()], date: currentDate.getDate(), month: currentDate.getMonth() }));

    };

    const nextDay = () => {

        const year = new Date().getFullYear();

        const currentDate = new Date(year, date.month, date.date);

        currentDate.setDate(currentDate.getDate() + 1);

        setDate(prev => ({ ...prev, day: arr[currentDate.getDay()], date: currentDate.getDate(), month: currentDate.getMonth() }));
        
    };


    return (
        <section className="next-appointment-list">
            <h2>Next appointments</h2>
            <div className="controls-appointment-list">
                <button onClick={() => prevDay()}><img style={{transform: "rotateY(180deg)"}} src={ArrowLeft} alt="previous" /></button>
                <span>{date.day}, {months[date.month]} {date.date}</span>
                <button onClick={() => nextDay()}><img src={ArrowLeft} alt="next" /></button>
            </div>
            <ListAppointment data={data}/>
        </section>
    );

};

export default NextAppointments;