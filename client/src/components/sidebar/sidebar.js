import React, {useState, useRef, useContext} from "react";
import { NavLink} from "react-router-dom";

import Calendar from "../../assets/calendar_filled.svg";
import Profile from "../../assets/profile_filled.svg";
import Settings from "../../assets/settings_filled.svg";
import ArrowRight from "../../assets/arrow_right_.svg";
import Home from "../../assets/home_filled.svg";
import Pet from "../../assets/pet_filled.svg";

import { AuthContext } from "../../utils/useAuth";

import styles from "../../styles/sidebar/sidebar.module.scss";
import "../../styles/sidebar/active.scss";

const SideBar = ({ showSidebar, setShowSidebar }) => {

    const { auth } = useContext(AuthContext);

    const [ user ] = useState( auth.user );

    const [minimize, setMinimize] = useState(localStorage.getItem("sidebar") === "true" || false);
    
    const sidebar = useRef(null);
    const links = useRef(null);

    const minimizeSidebar = () => {

        if (minimize === true) {
            
            setMinimize(false);
            localStorage.setItem("sidebar", false);
        }
        else{
            setMinimize(true);
            localStorage.setItem("sidebar", true);
        }

    };

    return (
        <nav className={styles.main} ref={sidebar} minimize={minimize.toString()} showsidebar={showSidebar.toString()}>
            <div className={styles.menu} onClick={ minimizeSidebar} minimize={minimize.toString()} tabIndex="1">
                <img src={ArrowRight} alt="minimize sidebar" />
            </div>
            <button className={styles.close} onClick={() => setShowSidebar(false)}>close</button>
            <div className={styles.link_container}>
                <ul className={styles.list} ref={links}>

                    <li title="Home" onClick={() => setShowSidebar(false)}>
                        <NavLink exact to="/" className={styles.link} activeClassName="active" > <img src={Home} alt="home" /> <span>Home</span> </NavLink>
                    </li>
                    <li title="Appointments" onClick={() => setShowSidebar(false)}>
                        <NavLink to="/appointments" className={styles.link}><img src={Calendar} alt="appointments"/> <span minimize={minimize.toString()}>Appointments</span></NavLink>
                    </li>
                    
                    <li title="Pet Owners" onClick={() => setShowSidebar(false)}>
                        <NavLink to="/owners" className={styles.link}> <img src={Profile} alt="pet owners" /> <span>Pet Owners</span></NavLink>
                    </li>
                    <li title="Pets" onClick={() => setShowSidebar(false)}>
                        <NavLink to="/pets" className={styles.link}> <img src={Pet} alt="pets" /> <span>Pets</span></NavLink>
                    </li>

                    <li title="Settings" onClick={() => setShowSidebar(false)}> <NavLink to="/settings" className={`${styles.link} ${styles.settings}`}> <img src={Settings} alt="settings"/> <span>Settings</span></NavLink> </li>

                    <li title="Profile" className={styles.profile}>
                        <NavLink to="/profile" className={styles.link}>
                            <div className={styles.profile_image}>

                            </div>
                            {user && <span>{user.name} {user.lastName.substring(0, 1)}.</span>}

                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );

};

export default SideBar;