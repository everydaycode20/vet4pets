import React, { useState } from "react";

import Calendar from "../calendar/calendar";

import "../../styles/appointment/add_appointment.scss";

const AddAppointment = ({setMakeAppointment}) => {

    const [dropdown, setDropdown] = useState(false);

    const [petDropdown, setPetDropdown] = useState(false);

    const [calendar, setCalendar] = useState(false);

    const [service, setService] = useState(null);

    const [pet, setPet] = useState(null);
    
    const [date, setDate] = useState(null);

    const arr = ["Vaccination", "General checkup", "Surgery"];

    const arrPet = ["pet 1", "pet 2", "pet 3"];

    const hideMenu = (e) => {

        if (e.classList.contains("add-appointment-container")) {
            setMakeAppointment(false);
        }

    };

    const showDropdown = () => {
        setDropdown(true)

        if (dropdown) {
            setDropdown(false);
        }
    };

    const showPetDropdown = () => {
        setPetDropdown(true)

        if (petDropdown) {
            setPetDropdown(false);
        }
    };
    
    const getService = (item) => {
        setService(item);
        setDropdown(false);
    }

    const getPet = (pet) => {
        setPet(pet);
        setPetDropdown(false);
    };

    const showCalendar = () => {
        setCalendar(true)

        if (calendar) {
            setCalendar(false);
        }
    };
    console.log(date);
    return (

        <div className="add-appointment-container" onClick={(e) => hideMenu(e.target)}>
            <form className="main-form-container">
                <h2>Add Appointment</h2>
                <div className="setup">
                    <div className="service-container">
                        {!service ? 
                        <button type="button" btnclassservice={dropdown.toString()} onClick={() => showDropdown()}>Add service</button> : 
                        <div className="service-selected">
                            <span>{service}</span>
                            <button type="button" onClick={() => showDropdown()}>Edit</button>
                        </div>}
                        {dropdown && <ul className="service-dropdown">
                            {arr.map((item, index) => {

                                return (
                                    <li key={index} onClick={() => getService(item)}>{item}</li>
                                )
                            })}
                        </ul>}
                    </div>
                    <div className="pet-container">
                        {!pet ?
                        <button type="button" btnclasspet={petDropdown.toString()} onClick={() => showPetDropdown()}>Add pet</button> : 
                        <div className="pet-selected">
                            <span>{pet}</span>
                            <button type="button" onClick={() => showPetDropdown()}>Edit</button>
                        </div>
                        }
                        {petDropdown && <ul className="pet-dropdown">
                            {arrPet.map((item, index) => {

                                return (
                                    <li key={index} onClick={() => getPet(item)}>{item}</li>
                                )
                            })}
                        </ul>}
                    </div>
                    <div className="date-container">
                    {!date ?
                        <button type="button" btnclassdate={calendar.toString()} onClick={() => showCalendar()}>Add date</button> : 
                        <div className="date-selected">
                            <span>{date.day}, {date.date} {date.month.substring(0, 3)} {date.hour}</span>
                            <button type="button" onClick={() => showCalendar()}>Edit</button>
                        </div>
                        }
                        {calendar && <Calendar setDate={setDate} date={date} setCalendar={setCalendar}/>}
                    </div>
                </div>
                <div className="submit-btn">
                    <button type="button" onClick={() => setMakeAppointment(false)}>Cancel</button>
                    <button type="button">Save appointment</button>
                </div>
            </form>
        </div>

    );

};

export default AddAppointment;