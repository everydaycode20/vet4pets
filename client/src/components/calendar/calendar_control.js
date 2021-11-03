
import "./styles/calendar-control.css";

import ArrowLeft from "./assets/arrow_left_.svg";

const CalendarControl = ({ year, setNewMonth, newMonth, setYear, changeView, setHoursDay, hoursDay, date }) => {

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    
    const prevMonth = () => {
        if (changeView) {
            setYear(year - 1);
            setNewMonth( prev => ({...prev, view: false}) );
        }
        else{
            setNewMonth(prev => ({...prev, month: newMonth.month - 1}));
            if (newMonth.month === 0) {
                setNewMonth(prev => ({...prev, month: 11 }));
                setYear(year - 1);
            }
        }
        
    }

    const nextMonth = () => {

        if (changeView) {
            setYear(year + 1);
            setNewMonth( prev => ({...prev, view: false}) );
        }
        else{
            setNewMonth(prev => ({...prev, month: newMonth.month + 1}));
            if (newMonth.month >= 11) {
                setNewMonth(prev => ({...prev, month: 0}));
                setYear(year + 1);
            }
        }

    }

    const makeChangeView = () => {
        
        if (hoursDay) {

            setHoursDay(false);
            setNewMonth( prev => ({...prev, view: true}) );
        }
        else{

            setNewMonth( prev => ({...prev, view: false}) );
        }
        
    };
    
    return (
        <div className="calendar-control-container">
            { <button className="bnt-prev" type="button" onClick={() => prevMonth()}> <img src={ArrowLeft} alt="next month" /> </button>}

            {!changeView || hoursDay ? <button className="bnt-month-view" type="button" onClick={() => makeChangeView()}> { hoursDay ? `${date.day}, ${date.date}` : months[newMonth.month]}, {year}</button> : <button className="bnt-year-view" type="button" >{year}</button>}
            
            { <button className="bnt-next" type="button" onClick={() => nextMonth()}><img src={ArrowLeft} alt="next month" className=""/> </button>}
        </div>
    );

}

export default CalendarControl;