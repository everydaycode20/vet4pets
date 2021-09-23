import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link  } from "react-router-dom";

import ProfileAppointments from "./profile_appointments";
import ProfileInfo from "./profile_info";

import "../../styles/owner/owner_profile.scss";

const OwnerProfile = () => {

    const { id } = useParams();
    
    const location = useLocation();

    const { nameOwner, email, address, telephones, registered } = location.state[0];

    return (
        <div className="main-owner-profile-container">
            
            {/* <div className="header">
                <h1>{nameOwner}</h1>
            </div> */}
            <button>
                <Link to="/owners" >X</Link>
            </button>
            
            <div className="profile-info-container">
                <ProfileInfo id={id} nameOwner={nameOwner} email={email} address={address} telephones={telephones} registered={registered}/>
                <ProfileAppointments id={id}/>
            </div>

            <Link to="/owners" className="link-background"/>
        </div>
    );
};

export default OwnerProfile;