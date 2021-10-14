import React, { useState, useContext } from "react";

import { TimeSettings } from "../../utils/providers";

import styles from "../../styles/settings/time.module.scss";

const Time = () => {

    const { timeFormat, setTimeFormat } = useContext(TimeSettings);

    const hourBtns = ["12 hours", "24 hours"];
    
    return (
        <div className={styles.container}>
            <h2>Time</h2>
            <div className={styles.hour}>
                <span>Format</span>
                <div>
                    {hourBtns.map((item, index) => {

                        return <button key={index} style={{backgroundColor: timeFormat === item ? "#3A6351": "#CDF0EA", color: timeFormat === item ? "white" : "#3A6351"}} onClick={() => setTimeFormat(item)}>{item}</button>

                    })}
                </div>
            </div>
        </div>
    );

};

export default Time;