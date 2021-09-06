import React from "react";

// import PatientsStats from "./patients_stats";
import HomeChart from "./home_chart";

import "../../styles/home/home.scss";

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
                        {/* <PatientsStats /> */}
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
                            {/* <div className="upcoming-appointments">
                                <h2>Upcoming appointments today</h2>
                                <span>50</span>
                            </div> */}
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
                    
                    <section className="button list">
                        <button>Create new appointment</button>
                        <button>Add new owner</button>
                        <button>Add new pet</button>
                        <button>Add new medicine</button>
                    </section>
                </div>
                
                <section className="next-appointment-list">
                    <h2>Next appointments</h2>
                    <ul className="list-appointment">
                        <span>appointment 1</span>
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