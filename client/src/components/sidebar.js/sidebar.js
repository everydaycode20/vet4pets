import React, {useState, useRef} from "react";
import {Link, NavLink} from "react-router-dom";

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

    const [minimize, setMinimize] = useState(localStorage.getItem("sidebar") === "true" || false);
    
    const sidebar = useRef(null);
    const links = useRef(null);

    const minimizeSidebar = () => {

        if (minimize === true) {
            console.log("should minimize");
            setMinimize(false);
            localStorage.setItem("sidebar", false);
        }
        else{
            setMinimize(true);
            localStorage.setItem("sidebar", true);
        }

    };

    return (
        <nav className="sidebar" ref={sidebar} minimize={minimize.toString()}>
            <div className="menu-control" onClick={ minimizeSidebar} minimize={minimize.toString()} tabIndex="1">
                <img src={ArrowRight} alt="minimize sidebar" />
            </div>
            <div className="link-container">
                <ul className="link-list" ref={links} >
                    <li title="Home"> <NavLink exact to="/" className="link" activeClassName="active" > <img src={Home} alt="home" /> <span>Home</span> </NavLink> </li>
                    <li title="Appointments"> <NavLink to="/appointments" className="link"><img src={Calendar} alt="appointments"/> <span minimize={minimize.toString()}>Appointments</span></NavLink> </li>
                    <li title="Medical Records"> <NavLink to="/records" className="link"> <img src={MedicalBook} alt="medical records"/> <span>Medical Records</span></NavLink> </li>
                    <li title="Pet Owners"> <NavLink to="/owners" className="link"> <img src={Profile} alt="pet owners" /> <span>Pet Owners</span></NavLink> </li>
                    <li title="Pets"> <NavLink to="/pets" className="link"> <img src={Pet} alt="pets" /> <span>Pets</span></NavLink> </li>
                    {/* <li> <NavLink to="/checkups" className="link"> <img src={Checkup} alt="checkups" /> <span>Checkups</span></NavLink> </li> */}
                    <li title="Miscellaneous"> <NavLink to="/miscellaneous" className="link"> <img src={Medicine} alt="medicine"/> <span>Miscellaneous</span></NavLink> </li>
                    {/* <li title="Settings"> <NavLink to="/settings" className="link settings"> <img src={Settings} alt="settings"/> <span>Settings</span></NavLink> </li> */}
                </ul>
            </div>
        </nav>
    );

};

export default SideBar;