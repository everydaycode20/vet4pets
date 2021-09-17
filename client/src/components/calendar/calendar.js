import React, {useState, useEffect} from "react";

import CalendarDays from "./calendar_days";
import CalendarControl from "./calendar_control";
import CalendarMonths from "./calendar_months";
import CalendarHours from "./calendar_hours";

import "./styles/calendar-main.css";

const Calendar = ({ setDate, date, setCalendar, setBtnActive }) => {

    const [daysInMonth, setDaysInMonth] = useState([]);

    const [newMonth, setNewMonth] = useState({ "month": new Date().getMonth(), "view": true });

    const [year, setYear] = useState(new Date().getFullYear());
    
    const [changeView, setChangeView] = useState(false);

    const [hoursDay, setHoursDay] = useState(false);

    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    useEffect(() => {
        
        let objDaysOfMonth = [];

        const tempYear = year;
        
        const month = newMonth.month;

        const date = new Date(tempYear, month , 1);

        const tempDate = new Date(tempYear, month , 1);

        const firstDayOfYear = new Date(tempYear, month , 1).getDay();

        for (let i = 0; i < firstDayOfYear; i++) {
            
            tempDate.setDate(tempDate.getDate() - 1);
            
            objDaysOfMonth.unshift({"day": daysOfWeek[new Date(tempDate).getDay()], "date": new Date(tempDate).getDate(), "month": months[new Date(tempDate).getMonth()], "year": tempDate.getFullYear(), "currentMonth": false});
        }

        while (date.getMonth() === month ) {
            
            objDaysOfMonth.push({"day": daysOfWeek[new Date(date).getDay()], "date": new Date(date).getDate(), "month": months[new Date(date).getMonth()], "year": date.getFullYear(), "currentMonth": true});
            
            date.setDate(date.getDate() + 1);
            
        }
        
        while (objDaysOfMonth.length % 7 !== 0) {
            
            objDaysOfMonth.push({"day": daysOfWeek[new Date(date).getDay()], "date": new Date(date).getDate(), "month": months[new Date(date).getMonth()], "year": date.getFullYear(), "currentMonth": false});

            date.setDate(date.getDate() + 1);
        }

        setDaysInMonth(objDaysOfMonth);

        if (newMonth.view === true) {
            setChangeView(false);
        }
        else{
            setChangeView(true);
        }
        
    }, [newMonth, year]);
    
    console.log(changeView);
    return (
        daysInMonth.length > 0 && <div className="calendar-main-container">
            <CalendarControl setYear={setYear} year={year} setNewMonth={setNewMonth} newMonth={newMonth} setChangeView={setChangeView} changeView={changeView} setHoursDay={setHoursDay} hoursDay={hoursDay} date={date} setBtnActive={setBtnActive}/>
            {!changeView && !hoursDay && <CalendarDays newMonth={newMonth} setDaysInMonth={setDaysInMonth} daysInMonth={daysInMonth} setYear={setYear} year={year} changeView={changeView} setDate={setDate} setHoursDay={setHoursDay} setBtnActive={setBtnActive}/>}
            {changeView && !hoursDay && <CalendarMonths setNewMonth={setNewMonth} setChangeView={setChangeView} newMonth={newMonth} daysInMonth={daysInMonth} setBtnActive={setBtnActive} />}
            {hoursDay && <CalendarHours setDate={setDate} setCalendar={setCalendar} setBtnActive={setBtnActive} />}
        </div>
    );
    
    
}

export default Calendar;