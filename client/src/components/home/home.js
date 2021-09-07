import React from "react";

// import PatientsStats from "./patients_stats";
import HomeChart from "./home_chart";

import "../../styles/home/home.scss";
import Calendar from "../../assets/calendar_filled_btn.svg";
import Medicine from "../../assets/medicine_filled_btn.svg";
import Pet from "../../assets/pet_filled_btn.svg";
import Profile from "../../assets/profile_filled_btn.svg";

const Main = () => {

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
                                    <span>20</span>
                                </div>
                                <div>
                                    <h2>Total patients this year</h2>
                                    <span>20</span>
                                </div>
                            </div>
                            <div className="finished-appointments">
                                <h2>Finished appointments today</h2>
                                <span>50</span>
                                <h2>Upcoming appointments today</h2>
                                <span>50</span>
                            </div>
                            <div className="top-treatments">
                                <h2>Top treatments</h2>
                                <ul>
                                    <li>Treatment 1</li>
                                    <li>Treatment 2</li>
                                    <li>Treatment 3</li>
                                    <li>Treatment 4</li>
                                    <li>Treatment 4</li>
                                </ul>
                            </div>
                        </section>
                        
                    </div>
                    
                    <section className="button-list">
                        <div className="button-inner-list">
                            <button><span>Create new appointment</span>  <img src={Calendar} alt="appointment" /></button>
                            <button><span>Add new owner</span> <img src={Profile} alt="enw owner" /></button>
                            <button><span>Add new pet</span> <img src={Pet} alt="new pet" /></button>
                            <button><span>Add new medicine</span> <img src={Medicine} alt="new medicine  " /></button>
                        </div>
                    </section>
                </div>
                
                <section className="next-appointment-list">
                    <h2>Next appointments</h2>
                    <ul className="list-appointment">
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                        <li>appointment 1</li>
                    </ul>
                </section>
            </div>
        </div>
    );

};

export default Main;