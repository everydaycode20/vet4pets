import React, { useState, useEffect } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

const ListAppointment = ({ data }) => {

    if (data.length === 0) {
        return <span style={{textAlign: "center"}}>There are no appointments</span>
    }

    return (
        <ul className="list-appointment">
            {data.map((item, index) => {

                return (
                    <li key={item.id}>
                        <span>{item.appointmentName}</span>
                        <span>{item.time}</span>
                        <span>{item.nameOwner}</span>
                    </li>
                )
            })}
        </ul>
    );
};

const NextAppointments = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const [date, setDate] = useState({ day: new Date().getDay() === 0 ? arr[new Date().getDay() + 1] : arr[new Date().getDay()], date: new Date().getDay() === 0 ? new Date().getDate() + 1 : new Date().getDate(), month: new Date().getMonth(), "year": new Date().getFullYear() });
    
    useEffect(() => {
        setLoading(true);
        fetch("/appointments/day", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"date": `${date.year}-${date.month + 1}-${date.date}`})
        }).then(res => res.json()).then(data => {
            
            setData(data);
            setLoading(false);
        }).catch(err => console.log(err));
        
    }, []);

    const prevDay = () => {

        setLoading(true);
        const year = new Date().getFullYear();

        const currentDate = new Date(year, date.month, date.date);
        
        currentDate.setDate(currentDate.getDate() - 1);
        
        // const currentDay = currentDate.getDay() === 0 ? currentDate.getDate() + 1 : currentDate.getDate() - 1;
        
        setDate(prev => ({ ...prev, day: arr[currentDate.getDay()], date: currentDate.getDate(), month: currentDate.getMonth() }));

        fetch("/appointments/day", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"date": `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`})
        }).then(res => res.json()).then(data => {
            
            setData(data);
            setLoading(false);
        }).catch(err => console.log(err));

    };

    const nextDay = () => {

        setLoading(true);
        const year = new Date().getFullYear();

        const currentDate = new Date(year, date.month, date.date);

        const currentDay = currentDate.getDay() === 0 ? currentDate.getDate() + 1 : currentDate.getDate() + 1;

        currentDate.setDate(currentDate.getDate() + 1);

        setDate(prev => ({ ...prev, day: arr[currentDate.getDay()], date: currentDate.getDate(), month: currentDate.getMonth() }));
        
        fetch("/appointments/day", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"date": `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDay}`})
        }).then(res => res.json()).then(data => {
            
            setData(data);
            setLoading(false);
        }).catch(err => console.log(err));

    };


    return (
        <section className="next-appointment-list">
            <h2>Next appointments</h2>
            <div className="controls-appointment-list">
                <button onClick={() => prevDay()}><img style={{transform: "rotateY(180deg)"}} src={ArrowLeft} alt="previous" /></button>
                <span>{date.day}, {months[date.month]} {date.date}</span>
                <button onClick={() => nextDay()}><img src={ArrowLeft} alt="next" /></button>
            </div>
            {loading ?  
                <ul className="appointment-skeleton">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul> : 
                <ListAppointment data={data}/>}
        </section>
    );

};

export default NextAppointments;