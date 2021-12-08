import React, { useState, useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";

import Header from "./header";
import Edit from "./edit";

import { AuthContext } from "../../utils/useAuth";

import usePage from "../../utils/usePage";

import DefaultProfilePhoto from "../../assets/profile_filled_grey.svg";

import styles from "../../styles/profile/profile.module.scss";

const Profile = () => {

    const { auth, setUser } = useContext(AuthContext);
    const { user } = auth;
    
    const [userInfo, setUserInfo] = useState({ name: user.name, lastName: user.lastName});

    usePage("profile");

    return (
        <div className={styles.container}>

            <Header />

            <div className={styles.inner_container}>

                <div className={styles.info}>

                    <div className={styles.image_container}>
                        <img src={user.image || DefaultProfilePhoto} alt="" />
                    </div>

                    <span className={styles.name}>{userInfo.name} {userInfo.lastName}</span>
                    <span>{user.email}</span>

                    <Link className={styles.link} to="/profile/edit">Edit</Link>
                </div>

            </div>

            <Switch>
                <Route path="/profile/edit">
                    <Edit user={user} setUserInfo={setUserInfo} setUser={setUser}/>
                </Route>
            </Switch>

        </div>
    );

};

export default Profile;