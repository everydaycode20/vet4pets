import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import ArrowLeft from "../../assets/arrow_left_.svg";

import "../../styles/settings/miscellaneous.scss";

const Miscellaneous = () => {
    

    
    return (
        <div className="misc-container">
            <h2>Miscellaneous</h2>
            <div>
                <Link to="/settings/appointments">Add new appointment type <img src={ArrowLeft} alt="arrow" /> </Link>
                <Link to="/settings/type/pet">Add new pet type or breed<img src={ArrowLeft} alt="arrow" /> </Link>
            </div>
        </div>
    );
};

export default Miscellaneous;