import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/profile/edit.module.scss";

const EditProfile = ({ user, setUserInfo }) => {
    
    const history = useHistory();

    const [name, setName] = useState(user.name);

    const [lastName, setLastName] = useState(user.lastName);
    
    const [errorName, setErrorName] = useState(false);

    const [errorLastName, setErrorLastName] = useState(false);

    const editProfile = (e) => {

        e.preventDefault();

        if (name === "") {
            setErrorName(true);
        }
        else if (lastName === "") {
            setErrorLastName(true);
        }
        else{
            fetch("/profile", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, lastName: lastName, id: user.id})
            }).then(res => res.json()).then(data => {
                
                if (data.status) {
                    setUserInfo(prev => ({...prev, name: name, lastName: lastName}));
                    history.push("/profile");
                }
    
            });
        }

    };

    return (

        <div className={styles.edit_container}>
            
            <form className={styles.form} onSubmit={e => editProfile(e)}>
                <h2>Edit Profile</h2>

                <div >
                    <label htmlFor="profile-name">Name</label>
                    <input type="text" id="profile-name" name="profile-name" value={name} onChange={e => setName(e.target.value)}/>
                </div>

                {errorName && <div><span>should not be empty</span></div>}

                <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>

                <div className={styles.submit_btn}>

                    <Link to="/profile">Cancel</Link>

                    <button type="submit" className={styles.save_btn} >Edit appointment</button>
                    
                </div>

                {errorLastName && <div><span>should not be empty</span></div>}

            </form>
            
        </div>

    );
};

export default EditProfile;