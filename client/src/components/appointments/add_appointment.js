import React, { useState, useEffect } from "react";

import Calendar from "../calendar/calendar";

import "../../styles/appointment/add_appointment.scss";

const AddAppointment = ({ setMakeAppointment, setDate, date, setAppointmentsWeek, appointmentsWeek, setAppMessage }) => {

    const [dropdown, setDropdown] = useState(false);

    const [ownerDropdown, setOwnerDropdown] = useState(false);

    const [petDropDown, setPetDropDown] = useState(false);

    const [calendar, setCalendar] = useState(false);

    const [service, setService] = useState(null);

    const [owner, setOwner] = useState(null);
    
    const [pet, setPet] = useState(null);

    const [btnActive, setBtnActive] = useState({step1: false, step2: false, step3: false,step4: date !== null ? true : false});

    const [ownerList, setOwnerList] = useState([]);

    const [petList, setPetList] = useState([]);

    const [serviceList, setServiceList] = useState([]);

    const [appointment, setAppointment] = useState({"id_pet": "", "id_owner": "", "appointment_type": ""});
    
    const arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    useEffect(() => {
        
        fetch("/owners",
            {
                method: "GET",
            }
        ).then(res => res.json()).then(data => {
            setOwnerList(data);
        });

        fetch("/appointments/type",
        {
            method: "GET",
        }
    ).then(res => res.json()).then(data => {
        
        setServiceList(data)
    });

    }, []);
    
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

    const showOwnerDropdown = () => {
        setOwnerDropdown(true)

        if (ownerDropdown) {
            setOwnerDropdown(false);
        }
    };
    
    const getService = (item, id) => {
        setAppointment(prev => ({...prev, appointment_type: id}));
        setService(item);
        setDropdown(false);
        setBtnActive(prev => ({...prev, step1: true}));
    }

    const getOwnerPets = (owner, id) => {

        setAppointment(prev => ({...prev, id_owner: id}));
        fetch("/owner/pets",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"id": id})
            }
        ).then(res => res.json()).then(data => {
            setPetList(data);
        });

        setOwner(owner);
        setOwnerDropdown(false);
        setBtnActive(prev => ({...prev, step2: true}));
    };

    const showCalendar = () => {
        setCalendar(true)

        if (calendar) {
            setCalendar(false);
        }
    };
    
    const showPetDropdown = () => {
        setPetDropDown(true);

        if (petDropDown) {
            setPetDropDown(false);
        }
    };
    
    const getPet = (petName, id) => {

        setAppointment(prev => ({...prev, id_pet: id}));
        setPet(petName);
        setPetDropDown(false);
        setBtnActive(prev => ({...prev, step3: true}));

    };
    
    const saveAppointment = (date) => {

        fetch("/appointment",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"date_appointment": `${date.year}-${date.monthIndex}-${date.date} ${date.hour}`, "id_pet": appointment.id_pet, "id_owner": appointment.id_owner, "appointment_type": appointment.appointment_type})
        }
        ).then(res => res.json()).then(data => {
            
            if (data.status) {
                setMakeAppointment(false);
                let data = JSON.parse(JSON.stringify(appointmentsWeek));

                let newObj = data.map((elm, i) => {
            
                    return {[arr[i]]: elm[arr[i]].map(item => {

                        if (item.dateDay === date.date && item.day === date.day && item.time === date.hour) {
                            item.appointmentName = service;
                            item.nameOwner = owner;
                            item.namePet = pet;
                        }
                        return item;
                    })};
                });
                setAppointmentsWeek(newObj);
                setAppMessage(true);
            }
        });

    };
    
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
                            {serviceList.map((item, index) => {

                                return (
                                    <li key={item.id} onClick={() => getService(item.appointmentName, item.id)}>{item.appointmentName}</li>
                                )
                            })}
                        </ul>}
                    </div>
                    <div className="owner-container">
                        {!owner ?
                        <button type="button" btnclasspet={ownerDropdown.toString()} onClick={() => showOwnerDropdown()}>Add Owner</button> : 
                        <div className="owner-selected">
                            <span>{owner}</span>
                            <button type="button" onClick={() => showOwnerDropdown()}>Edit</button>
                        </div>
                        }
                        {ownerDropdown && <ul className="owner-dropdown">
                            {ownerList.map((item, index) => {

                                return (
                                    <li key={item.id} onClick={() => getOwnerPets(item.nameOwner, item.id)}>{item.nameOwner}</li>
                                )
                            })}
                        </ul>}
                    </div>
                    {btnActive.step2 && <div className="pet-container">
                        {!pet? 
                        <button type="button" btnclasspet={petDropDown.toString()} onClick={() => showPetDropdown()}>Add Pet</button> : 
                        <div className="pet-selected">
                            <span>{pet}</span>
                            <button type="button" onClick={() => showPetDropdown()}>Edit</button>
                        </div>
                        }
                        {petDropDown && <ul className="pet-dropdown">
                            {petList.map((item, index) => {

                                return (
                                    <li key={item.id} onClick={() => getPet(item.namePet, item.id)}>{item.namePet}</li>
                                )
                            })}
                        </ul>}
                    </div>}
                    <div className="date-container">
                    {!date ?
                        <button type="button" btnclassdate={calendar.toString()} onClick={() => showCalendar()}>Add date</button> : 
                        <div className="date-selected">
                            <span>{date.day}, {date.date} {date.month.substring(0, 3)} {date.hour}</span>
                            <button type="button" onClick={() => showCalendar()}>Edit</button>
                        </div>
                        }
                        {calendar && <Calendar setDate={setDate} date={date} setCalendar={setCalendar} setBtnActive={setBtnActive} />}
                    </div>
                </div>
                <div className="submit-btn">
                    <button type="button" onClick={() => setMakeAppointment(false)}>Cancel</button>
                    {btnActive.step1 && btnActive.step2 && btnActive.step3 && btnActive.step4 ? 
                        <button type="button" className="save-btn" onClick={() => saveAppointment(date)}>Save appointment</button> :
                        <button type="button" className="save-btn-dis">Save appointment</button> 
                    }
                    
                </div>
            </form>
        </div>

    );

};

export default AddAppointment;