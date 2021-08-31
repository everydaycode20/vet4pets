import React, {useState, useRef} from "react";
import {Link} from "react-router-dom";

import "../../styles/sidebar.scss";
import Calendar from "../../assets/calendar_filled.svg";
import MedicalBook from "../../assets/medical-record_.svg";
import Medicine from '../../assets/medicine_filled.svg';
import Profile from "../../assets/profile_filled.svg";
import Settings from "../../assets/settings_filled.svg";
import Checkup from "../../assets/checkup_.svg";
import ArrowRight from "../../assets/arrow_right_.svg";
import Home from "../../assets/home_filled.svg";
import Pet from "../../assets/pet_filled.svg";

const SideBar = () => {

    const [minimize, setMinimize] = useState(false);

    const sidebar = useRef(null);
    const links = useRef(null);

    const minimizeSidebar = () => {
        
        setMinimize(true);

        if (minimize === true) {
            setMinimize(false);
        }

    };

    return (
        <nav className="sidebar" ref={sidebar} minimize={minimize.toString()}>
            <div className="menu-control" onClick={() => minimizeSidebar()} minimize={minimize.toString()}>
                <img src={ArrowRight} alt="minimize sidebar" />
            </div>
            <div className="link-container">
                <ul className="link-list" ref={links} >
                    <li title="Home"> <Link to="/" className="link"> <img src={Home} alt="home" /> <span>Home</span> </Link> </li>
                    <li> <Link to="/appointments" className="link"><img src={Calendar} alt="appointments"/> <span minimize={minimize.toString()}>Appointments</span></Link> </li>
                    <li> <Link to="/records" className="link"> <img src={MedicalBook} alt="medical records"/> <span>Medical Records</span></Link> </li>
                    <li> <Link to="/owners" className="link"> <img src={Profile} alt="pet owners" /> <span>Pet Owners</span></Link> </li>
                    <li> <Link to="/pets" className="link"> <img src={Pet} alt="pets" /> <span>Pets</span></Link> </li>
                    <li> <Link to="/medicine" className="link"> <img src={Medicine} alt="medicine"/> <span>Medicine</span></Link> </li>
                    <li> <Link to="/checkups" className="link"> <img src={Checkup} alt="checkups" /> <span>Checkups</span></Link> </li>
                    <li> <Link to="/settings" className="link settings"> <img src={Settings} alt="settings"/> <span>Settings</span></Link> </li>
                </ul>
            </div>
        </nav>
    );

};

export default SideBar;