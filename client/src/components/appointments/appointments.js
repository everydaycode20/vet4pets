import React, { useState, useEffect } from "react";

import Calendar from "./calendar";
import AddAppointment from "./add_appointment";
import Header from "./header";
import CalendarControls from "./calendar_controls";

import "../../styles/appointment/appointments.scss";

const Appointments = () => {

    const [newWeek, setNewWeek] = useState({"day": new Date().getDate(), "dayInWeek": new Date().getDay()});

    const [week, setWeek] = useState(null);

    const [currentYear, setCurrentYear] = useState("");

    const [makeAppointment, setMakeAppointment] = useState(false);

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    useEffect(() => {
        
        let objWeek = [{"day": "monday", "date": 0,  "month": "", "year": ""}, {"day": "tuesday", "date": 0, "month": "", "year": ""}, {"day": "wednesday", "date": 0, "month": "", "year": ""}, {"day": "thursday", "date": 0, "month": "", "year": ""}, {"day": "friday", "date": 0, "month": "" ,"year": ""}];
        console.log(objWeek);
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        
        const month = currentDate.getMonth();
        
        if (newWeek.dayInWeek !== 0) {
            let tempDay = newWeek.day - newWeek.dayInWeek + 1;
            const date = new Date(year, month, tempDay);

            for (let i = 0; i < 5; i++) {

                objWeek[i].date = date.getDate();
                objWeek[i].month = months[date.getMonth()];
                objWeek[i].year = date.getFullYear();
                date.setDate(date.getDate() + 1);
                
            }
            setCurrentYear(date.getFullYear());
        }
        else{
            const date = new Date(year, month, newWeek.day);
            for (let i = 0; i < 5; i++) {
            
                objWeek[i].date = date.getDate();
                objWeek[i].month = months[date.getMonth()];
                objWeek[i].year = date.getFullYear();
                date.setDate(date.getDate() + 1);
            }
            setCurrentYear(date.getFullYear());
        }

        setWeek(objWeek);
        
    }, [newWeek]);

    const getPrevWeek = () => {
        
        setNewWeek(prev => ({...prev, day: newWeek.day - 7}));
        
    }

    const getNextWeek = () => {
        
        setNewWeek(prev => ({...prev, day: newWeek.day + 7}));
    }

    const addAppointment = () => {

        setMakeAppointment(true);

        if(makeAppointment) setMakeAppointment(false);

    };

    return (
        <div className="main-appointment-container">
            <Header/>
            <CalendarControls getPrevWeek={getPrevWeek} week={week} getNextWeek={getNextWeek} currentYear={currentYear} addAppointment={addAppointment}/>
            <Calendar newWeek={newWeek} week={week} setWeek={setWeek} setCurrentYear={setCurrentYear}/>
            {makeAppointment && <AddAppointment setMakeAppointment={setMakeAppointment}/>}
        </div>
    );

};

export default Appointments;