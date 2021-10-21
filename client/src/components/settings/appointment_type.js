import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import ColorPicker from "./color_picker/color-picker";

import getCookie from "../../utils/getCookie";

import styles from "../../styles/settings/appointment_type.module.scss";

const ApptType = ({ setMessage, borderColor }) => {

    return (
        <div className={styles.message} style={{borderLeft: `5px solid ${borderColor}`}} onAnimationEnd={() => setMessage(false)}>
            <span>Appointment type added</span>
        </div>
    );
};

const AppointmentType = () => {
    
    const [showColorPicker, setShowColorPicker] = useState(false);
    
    const [color, setColor] = useState("");

    const [error, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [message, setMessage] = useState(false);

    const [fetchError, setFetchError] = useState(false);

    const addType = (e) => {

        e.preventDefault();

        const { name } = e.target.elements;

        const cookie = getCookie("csrfToken");

        if (name.value === "") {
            setError(true);
            setErrorMessage("You should type a name");
        }
        else{
            fetch("/appointment/type", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "CSRF-TOKEN": cookie
                },
                body: JSON.stringify({appointment_type: name.value, color: color || "#135A5A"})
            }).then(res =>{ 
            
                if (!res.ok) {
                    setFetchError(true);
                }
                else{
                    return res.json()
                }
                
            }).then(data => {

                if (!data.status) {
                    setErrorMessage(data.message);
                    setError(true);
                }
                else{
                    setMessage(true);
                }

            }).catch(err => console.log(err));
        }

    };

    if (fetchError) {
        
        return <Redirect to="/login"/>
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.type}>
                
                <form className={styles.form} onSubmit={e => addType(e)}>
                    <h2>Add a new appointment type</h2>
                    <div className={styles.name}>
                        <label htmlFor="name">Appointment name</label>
                        <input type="text" name="name" id="name" onChange={() => setError(false)}/>
                    </div>
                    {error && <div className={styles.error}>{errorMessage}</div>}
                    <div className={styles.color}>
                        <label htmlFor="color">Select color</label>
                        <button className={styles.color_picker} style={{backgroundColor: color || "#135A5A"}} type="button" onClick={() => setShowColorPicker(!showColorPicker)}></button>
                        {showColorPicker && <ColorPicker colorCode={false} setColor={setColor}/>}
                    </div>
                    <button>Add appointment type</button>
                </form>
                
            </div>
            {message && <ApptType setMessage={setMessage} borderColor={color}/>}
            <Link to="/settings" className={styles.link_background}/>
            
        </div>
    );
};

export default AppointmentType;