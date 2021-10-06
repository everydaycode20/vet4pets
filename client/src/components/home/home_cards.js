import React from "react";

export const PatientMonth = ({ totalPatients }) => {

    return (
        <div className="card">
            <span>{totalPatients.month}</span>
            <h2>Patients this month</h2>
        </div>
    );
};

export const PatientYear = ({ totalPatients }) => {

    return (
        <div className="card">
            <span>{totalPatients.year}</span>
            <h2>Patients this year</h2>
        </div>
    );
};

export const Finished = ({ appointments }) => {

    return (
        <div className="card app">
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
};

export const TopAppointments = ({ topList }) => {

    return (
        <React.Fragment>
            <ul className="top-treatments-list">
                {topList.map((item, index) => {

                    return <li key={index}>{item.appointmentName}</li>
                })}
            </ul>
        </React.Fragment>
    );
};