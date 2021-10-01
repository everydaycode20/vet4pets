import React, { useState, useEffect, memo } from "react";

import HomeChart from "./home_chart";

import "../../styles/home/home.scss";
import Calendar from "../../assets/calendar_filled_btn.svg";
import Medicine from "../../assets/medicine_filled_btn.svg";
import Pet from "../../assets/pet_filled_btn.svg";
import Profile from "../../assets/profile_filled_btn.svg";
import NextAppointments from "./next_appoinments";
import { PatientMonth, PatientYear, Finished, TopAppointments } from "./home_cards";
import Skeleton from "../misc/skeleton";

const Main = memo(() => {

    const [totalPatients, setTotalPatients] = useState({year: "", month: ""});

    const [appointments, setAppointments] = useState({finished: "", upcoming: ""});

    const [topList, setTopList] = useState([]);

    const [loadingTopList, setLoadingTopList] = useState(true);

    const [latest, setLatest] = useState([]);

    const [loadingLatest, setLoadingLatest] = useState(true);

    const [greetings, setGreetings] = useState("");

    useEffect(() => {

        const currentTime = new Date().getHours();

        if (currentTime >= 4 && currentTime <= 12) {
            setGreetings("Good morning");
        }
        else if(currentTime >= 13 && currentTime <= 16) {
            setGreetings("Good afternoon");
        }
        else{
            setGreetings("Good evening");
        }

        setLoadingTopList(true);

        fetch("/pets/month", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setTotalPatients(prev => ({...prev, year: data.countYear, month: data.countMonth}));

        }).catch(err => console.log(err));

        fetch("/appointments/day/total", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setAppointments(prev => ({...prev, finished: data.finished, upcoming: data.upcoming}));

        }).catch(err => console.log(err));

        fetch("/appointments/top", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setTopList(data);
            setLoadingTopList(false);

        }).catch(err => console.log(err));

        setLoadingLatest(true);

        fetch("/appointments/latest", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setLatest(data);

            setLoadingLatest(false);

        }).catch(err => console.log(err));

    }, []);

    return (
        <div className="main-home-container">
            <div className="title-container">
                <h1>Home</h1>
            </div>
            <div className="info-home-container">
                <div className="charts-container">
                    <div className="charts-inner-container">
                        
                        <section className="appointments-status">

                            <PatientMonth totalPatients={totalPatients}/>

                            <PatientYear totalPatients={totalPatients}/>
                            
                            <Finished appointments={appointments}/>

                        </section>

                        <div className="main-container-chart">
                            <HomeChart />
                                <div className="top-treatments">
                                    <h2>Top appointments</h2>
                                    {loadingTopList ? <Skeleton height={32} backgroundColor={"#CDF0EA"} width={100} number={3}/> :
                                        <TopAppointments topList={topList} />
                                    }
                                </div>
                        </div>
                        
                        <div className="latest-patients">
                            <h2>Latest patients</h2>
                            {loadingLatest ? <Skeleton height={32} backgroundColor={"#CDF0EA"} width={100} number={3}/> : 
                            <ul>
                                {latest.map(item => {

                                    return (
                                        <li key={item.id}>
                                            <span>{item.date}</span>
                                            <span>{item.time}</span>
                                            <span>{item.namePet}</span>
                                            <span>{item.nameOwner}</span>
                                            <span>{item.appointmentName}</span>
                                        </li>
                                    )
                                })}
                            </ul> }
                        </div>
                    </div>
                </div>
                
                <NextAppointments />
            </div>
        </div>
    );

});

export default Main;