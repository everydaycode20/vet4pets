import React, {  } from "react";
import { Link } from "react-router-dom";

import ArrowLeft from "../../assets/arrow_left_.svg";

import styles from "../../styles/settings/miscellaneous.module.scss";

const Miscellaneous = () => {
    
    return (
        <div className={styles.container}>
            <h2>Miscellaneous</h2>
            <div>
                <Link to="/settings/appointments">Add new appointment type <img src={ArrowLeft} alt="arrow" /> </Link>
                <Link to="/settings/type/pet">Add new pet type or breed<img src={ArrowLeft} alt="arrow" /> </Link>
            </div>
        </div>
    );
};

export default Miscellaneous;