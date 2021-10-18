import React from "react";
import { Link } from "react-router-dom";

import EditProfile from "./edit_profile";

import styles from "../../styles/profile/edit.module.scss";

const Edit = ( { user, setUserInfo } ) => {

    return (
        <div className={styles.container}>
            
            <EditProfile user={user} setUserInfo={setUserInfo}/>

            <Link to="/profile" className={styles.link}/>

        </div>
    );
};

export default Edit;