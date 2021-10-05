import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ColorPicker from "./color_picker/color-picker";

import "../../styles/settings/appointment_type.scss";

const ApptType = ({ setMessage, borderColor }) => {

    return (
        <div className="type-message" style={{borderLeft: `5px solid ${borderColor}`}} onAnimationEnd={() => setMessage(false)}>
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

    const addType = (e) => {

        e.preventDefault();

        const { name } = e.target.elements;

        if (name.value === "") {
            setError(true);
            setErrorMessage("You should type a name");
        }
        else{
            fetch("/appointment/type", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({appointment_type: name.value, color: color || "#135A5A"})
            }).then(res => res.json()).then(data => {

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

    return (
        <div className="app-type-container">
            
            <div className="main-app-type-container">
                <h2>Add a new appointment type</h2>
                <form className="form-type" onSubmit={e => addType(e)}>
                    <div className="name">
                        <label htmlFor="name">Appointment name</label>
                        <input type="text" name="name" id="name" onChange={() => setError(false)}/>
                    </div>
                    {error && <div className="error">{errorMessage}</div>}
                    <div className="color">
                        <label htmlFor="color">Select color</label>
                        <button className="btn-color-picker" style={{backgroundColor: color || "#135A5A"}} type="button" onClick={() => setShowColorPicker(!showColorPicker)}></button>
                        {showColorPicker && <ColorPicker colorCode={false} setColor={setColor}/>}
                    </div>
                    <button>Add appointment type</button>
                </form>
            </div>
            {message && <ApptType setMessage={setMessage} borderColor={color}/>}
            <Link to="/settings" className="link-background"/>
        </div>
    );
};

export default AppointmentType;