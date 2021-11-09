import React, { memo } from "react";

import { header, control, control_view_calendar} from "../../styles/appointment/appointments.module.scss";

const Header = memo(({ setCalendarView, calendarView }) => {

    return (
        <header className={header}>
        <div className={control}>
            <h1>Appointments</h1>
            <div className={control_view_calendar}>

                <button style={{fontWeight: calendarView === "monthly" && "700"}} onClick={() => setCalendarView("monthly")}>monthly</button>

                <button style={{fontWeight: calendarView === "weekly" && "700"}} onClick={() => setCalendarView("weekly")}>weekly</button>
                
                <button style={{fontWeight: calendarView === "daily" && "700"}} onClick={() => setCalendarView("daily")}>daily</button>

            </div>
        </div>
        
    </header>
    );
});

export default Header;