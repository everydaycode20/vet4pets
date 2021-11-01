import React, { useState, useEffect, memo } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

import Skeleton from "../misc/skeleton";

import styles from "../../styles/home/next_appointment.module.scss";

const ListAppointment = ({ data }) => {

    if (data.length === 0) {
        return <span style={{textAlign: "center"}}>There are no appointments</span>
    }

    return (
        <ul className={styles.list}>
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

const NextAppointments = memo(() => {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const [date, setDate] = useState({ day:  arr[new Date().getDay()] , date: new Date().getDate(), month: new Date().getMonth(), "year": new Date().getFullYear() });
    
    useEffect(() => {

        let controller = new AbortController();

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
        
        return () => controller?.abort();

    }, []);

    const prevDay = () => {

        setLoading(true);
        const year = new Date().getFullYear();

        const currentDate = new Date(year, date.month, date.date);
        
        currentDate.setDate(currentDate.getDate() - 1);
        
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
            body: JSON.stringify({"date": `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`})
        }).then(res => res.json()).then(data => {
            
            setData(data);
            setLoading(false);
        }).catch(err => console.log(err));

    };


    return (
        <section className={styles.container}>
            <h2>Next appointments</h2>
            <div className={styles.controls}>
                <button onClick={() => prevDay()}><img style={{transform: "rotateY(180deg)"}} src={ArrowLeft} alt="previous" /></button>
                <span>{date.day}, {months[date.month]} {date.date}</span>
                <button onClick={() => nextDay()}><img src={ArrowLeft} alt="next" /></button>
            </div>
            {loading ? 
                <Skeleton height={93} backgroundColor={"#CDF0EA"} number={3} width={100}/> :
                <ListAppointment data={data}/>}
        </section>
    );

});

export default NextAppointments;