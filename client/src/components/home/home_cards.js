import React, { memo } from "react";

import { card, app, top_list } from "../../styles/home/card.module.scss";

export const PatientMonth = memo(({ totalPatients }) => {

    return (
        <div className={card}>
            <span>{totalPatients.month}</span>
            <h2>Patients this month</h2>
        </div>
    );
});

export const PatientYear = memo(({ totalPatients }) => {

    return (
        <div className={card}>
            <span>{totalPatients.year}</span>
            <h2>Patients this year</h2>
        </div>
    );
});

export const Finished = memo(({ appointments }) => {

    return (
        <div className={app}>
            <h2 className="app-title">Appointments</h2>
            <div>
                <div>
                    <span>{appointments.finished}</span>
                    <h2>Finished</h2>
                </div>
                <div>
                    <span>{appointments.upcoming}</span>
                    <h2>Upcoming</h2>
                </div>
            </div>
            
            
        </div>
    );
});

export const TopAppointments = memo(({ topList }) => {

    return (
        <React.Fragment>
            <ul className={top_list}>
                {topList.map((item, index) => {

                    return <li key={index}>{item.appointmentName}</li>
                })}
            </ul>
        </React.Fragment>
    );
});