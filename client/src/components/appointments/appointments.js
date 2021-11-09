import React, { useState, useEffect, memo } from "react";
import { Switch, Route } from "react-router-dom";

import Calendar from "./calendar";
import AddAppointment from "./add_appointment";
import Header from "./header";
import CalendarControls from "./calendar_controls";
import AppointmentMessage from "./appointment_message";
import MonthView from "./month_view";
import Edit from "./edit";
import DayView from "./day_view";

import styles from "../../styles/appointment/appointments.module.scss";

const Appointments = memo(({ socket }) => {
    
    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [newWeek, setNewWeek] = useState({ "day": new Date().getDate(), "dayInWeek": new Date().getDay() });

    const [week, setWeek] = useState(null);

    const [currentYear, setCurrentYear] = useState("");

    const [makeAppointment, setMakeAppointment] = useState(false);

    const [date, setDate] = useState(null);

    const [appointmentsWeek, setAppointmentsWeek] = useState([]);

    const [appMessage, setAppMessage] = useState(false);

    const [calendarView, setCalendarView] = useState("weekly");

    const [month, setMonth] = useState([]);

    const [newMonth, setNewMonth] = useState({ month: new Date().getMonth() });

    const [messageContent, setMessageContent] = useState("");

    const [day, setDay] = useState({ day: new Date().getDate(), month: months[new Date().getMonth()], year: new Date().getFullYear(), dayName: days[new Date().getDay()], numberMonth: new Date().getMonth() });

    useEffect(() => {
        socket.emit("new appointment", "");
    });

    useEffect(() => {
        
        let objWeek = [{"day": "monday", "date": 0,  "month": "", "year": "", "monthIndex": ""}, {"day": "tuesday", "date": 0, "month": "", "year": "", "monthIndex": ""}, {"day": "wednesday", "date": 0, "month": "", "year": "", "monthIndex": ""}, {"day": "thursday", "date": 0, "month": "", "year": "", "monthIndex": ""}, {"day": "friday", "date": 0, "month": "" ,"year": "", "monthIndex": ""}];
        
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
                objWeek[i].monthIndex = date.getMonth() + 1;
                date.setDate(date.getDate() + 1);
                
            }
            setCurrentYear(date.getFullYear());
        }
        else{
            
            const date = new Date(year, month, newWeek.day);
            
            for (let i = 0; i < 5; i++) {
                date.setDate(date.getDate() + 1);
                objWeek[i].date = date.getDate();
                objWeek[i].month = months[date.getMonth()];
                objWeek[i].year = date.getFullYear();
                objWeek[i].monthIndex = date.getMonth() + 1;
                
            }
            setCurrentYear(date.getFullYear());
        }

        setWeek(objWeek);
        
    }, [newWeek]);
    
    const getPrevWeek = () => {
        
        setNewWeek(prev => ({...prev, day: newWeek.day - 7}));
        
    };

    const getNextWeek = () => {
        
        setNewWeek(prev => ({...prev, day: newWeek.day + 7}));
    };
    
    const getNextDay = () => {

        const date = new Date(day.year, day.numberMonth, day.day);

        date.setDate(date.getDate() + 1);

        setDay(prev => ( { ...prev, day: date.getDate(), month: months[date.getMonth()], year: date.getFullYear(), dayName: days[date.getDay()], numberMonth: date.getMonth() } ) );

    };
    
    const getPrevDay = () => {

        const date = new Date(day.year, day.numberMonth, day.day);

        date.setDate(date.getDate() - 1);

        setDay(prev => ( { ...prev, day: date.getDate(), month: months[date.getMonth()], year: date.getFullYear(), dayName: days[date.getDay()], numberMonth: date.getMonth() } ) );

    };

    const addAppointments = (e, time, dateDay, day, month, year, monthIndex) => {
        
        if ((e.classList.value.includes("hour_item") && e.children.length === 0) && !e.classList.contains("dot") && !e.classList.contains("dot_container") && !e.classList.contains("delete")) {
            setDate({date: dateDay, day: day, hour: time, month: month, monthIndex: monthIndex, year: year});
            setMakeAppointment(true);
        }
        else if (e.classList.contains("btn-add-app") && !e.classList.contains("dot") && !e.classList.contains("dot_container")) {
            setDate(null);
            setMakeAppointment(true);
        }

    };
    
    return (
            <div className={styles.container}>

                <div>
                    <Header setCalendarView={setCalendarView} calendarView={calendarView}/>
                    <CalendarControls getPrevWeek={getPrevWeek} week={week} getNextWeek={getNextWeek} currentYear={currentYear} addAppointments={addAppointments} calendarView={calendarView} month={month} setNewMonth={setNewMonth} newMonth={newMonth} setNewWeek={setNewWeek} setDay={setDay} day={day} getPrevDay={getPrevDay} getNextDay={getNextDay} />
                </div>

                <div></div>

                {calendarView === "weekly" && <Calendar newWeek={newWeek} week={week} setWeek={setWeek} setCurrentYear={setCurrentYear} addAppointments={addAppointments} setAppointmentsWeek={setAppointmentsWeek} appointmentsWeek={appointmentsWeek} setDate={setDate} setMakeAppointment={setMakeAppointment}/>}

                {calendarView === "monthly" && <MonthView setMonth={setMonth} newMonth={newMonth} />}

                {calendarView === "daily" && <DayView setDay={setDay} day={day} /> }

                {makeAppointment && <AddAppointment setMakeAppointment={setMakeAppointment} setDate={setDate} date={date} setAppointmentsWeek={setAppointmentsWeek} appointmentsWeek={appointmentsWeek} setAppMessage={setAppMessage} socket={socket} setMessageContent={setMessageContent} />}

                {appMessage && <AppointmentMessage setAppMessage={setAppMessage} msg={messageContent}/>}
                
                <Switch>
                    <Route path="/appointments/edit/:id">
                        <Edit setAppMessage={setAppMessage} setMessageContent={setMessageContent} appointmentsWeek={appointmentsWeek} setAppointmentsWeek={setAppointmentsWeek} socket={socket}/>
                    </Route>
                </Switch>

            </div>
    );

});

export default Appointments;