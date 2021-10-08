import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link  } from "react-router-dom";

import ProfileAppointments from "./profile_appointments";
import ProfileInfo from "./profile_info";

import Close from "../../assets/close_.svg"

import styles from "../../styles/owner/owner_profile.module.scss";

const OwnerProfile = () => {

    const { id } = useParams();
    
    const location = useLocation();

    const { nameOwner, email, address, telephones, registered } = location.state[0];

    return (
        <div className={styles.container}>
            
            <Link to="/owners" ><img src={Close} alt="close" /></Link>
            
            <div className={styles.profile}>
                <ProfileInfo id={id} nameOwner={nameOwner} email={email} address={address} telephones={telephones} registered={registered}/>
                <ProfileAppointments id={id}/>
            </div>

            <Link to="/owners" className={styles.link}/>
        </div>
    );
};

export default OwnerProfile;