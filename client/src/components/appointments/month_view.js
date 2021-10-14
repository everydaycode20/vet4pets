import React, { useEffect } from "react";

import useDaysInMonth from "../../utils/useDaysInMonth";

import styles from "../../styles/appointment/month_view.module.scss";

const MonthView = ({ setMonth, newMonth }) => {

    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const daysInMonth = useDaysInMonth( newMonth.month );
    
    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    useEffect(() => {
        
        setMonth(daysInMonth);
        
    }, [daysInMonth]);

    return (
        <div className={styles.container}>

            <div className={styles.inner_container} style={{gridTemplateRows: `auto repeat(${daysInMonth.length/7}, 1fr)`}}>

                {daysOfWeek.map((day, index) => {
                    return <span className={styles.day_name} key={index}>{day}</span>
                })}

                {daysInMonth.map((day, index) => {
                    
                    const condition = day.year === new Date().getFullYear() && day.date === new Date().getDate() && day.month === months[new Date().getMonth()];

                    return (
                        <div key={index} className={styles.day_month} style={{backgroundColor: !day.currentMonth && "#CDF0EA", border: condition && "5px solid #F38BA0"}}>

                            <span>{day.date}</span>

                            {day.count && <span className={styles.count}>{day.count} appointments</span>}

                        </div>
                    )
                    })}
            </div>

        </div>
    );

};

export default MonthView;