import React, { useState, useEffect } from "react";

import HomeChart from "./home_chart";

import "../../styles/home/home.scss";
import Calendar from "../../assets/calendar_filled_btn.svg";
import Medicine from "../../assets/medicine_filled_btn.svg";
import Pet from "../../assets/pet_filled_btn.svg";
import Profile from "../../assets/profile_filled_btn.svg";
import NextAppointments from "./next_appoinments";

const Main = () => {

    const [totalPatients, setTotalPatients] = useState({year: "", month: ""});

    const [appointments, setAppointments] = useState({finished: "", upcoming: ""});

    const [topList, setTopList] = useState([]);

    useEffect(() => {
        
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
                        <HomeChart />
                        <section className="appointments-status">
                            <div className="patients-stats">
                                <div>
                                    <h2>Total patients this month</h2>
                                    <span>{totalPatients.month}</span>
                                </div>
                                <div>
                                    <h2>Total patients this year</h2>
                                    <span>{totalPatients.year}</span>
                                </div>
                            </div>
                            <div className="finished-appointments">
                                <h2>Finished appointments today</h2>
                                <span>{appointments.finished}</span>
                                <h2>Upcoming appointments today</h2>
                                <span>{appointments.upcoming}</span>
                            </div>
                            <div className="top-treatments">
                                <h2>Top treatments</h2>
                                <ul className="top-treatments-list">
                                    {topList.map((item, index) => {

                                        return <li key={index}>{item.appointmentName}</li>
                                    })}
                                </ul>
                            </div>
                        </section>
                        
                    </div>
                    
                    {/* <section className="button-list">
                        <div className="button-inner-list">
                            <button><span>Create new appointment</span>  <img src={Calendar} alt="appointment" /></button>
                            <button><span>Add new owner</span> <img src={Profile} alt="enw owner" /></button>
                            <button><span>Add new pet</span> <img src={Pet} alt="new pet" /></button>
                            <button><span>Add new medicine</span> <img src={Medicine} alt="new medicine  " /></button>
                        </div>
                    </section> */}
                </div>
                
                <NextAppointments />
            </div>
        </div>
    );

};

export default Main;