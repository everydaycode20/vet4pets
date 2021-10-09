import React, { useState, useEffect } from "react";

import daysInMonth from "../../utils/daysInMonth";
import useDaysInMonth from "../../utils/useDaysInMonth";

import styles from "../../styles/appointment/month_view.module.scss";

const MonthView = ({ setMonth, newMonth }) => {

    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const daysInMonth = useDaysInMonth( newMonth.month );
    
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
                    
                    return (
                        <div key={index} className={styles.day_month} style={{backgroundColor: !day.currentMonth && "#CDF0EA"}}>

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