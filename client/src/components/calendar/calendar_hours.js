
import "./styles/calendar_hours.css";

const CalendarHours = ({ setDate, setCalendar, setBtnActive }) => {

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"];

    const setAppointment = (hour) => {
        setDate(prev => ({...prev, "hour": hour}));
        setCalendar(false);
        setBtnActive(prev => ({...prev, step3: true}));
    };

    return (
        <div className="calendar-hours-container">
            {hours.map((hour, index) => {

                return (
                    <button key={index} className="btn-hour" type="button" onClick={() => setAppointment(hour)}>{hour}</button>
                )
            })}
        </div>
    );
};

export default CalendarHours;