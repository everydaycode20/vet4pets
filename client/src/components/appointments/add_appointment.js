import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Calendar from "../calendar/calendar";
import DropdownEdit from "../misc/dropdown_edit";
import GenericDropdown from "../misc/generic_dropdown";

import getCookie from "../../utils/getCookie";

import styles from "../../styles/appointment/add_appointment.module.scss";

const AddAppointment = ({ setMakeAppointment, setDate, date, setAppointmentsWeek, appointmentsWeek, setAppMessage, socket, setMessageContent }) => {

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

    const [appointmentColor, setAppointmentColor] = useState("");

    const [error, setError] = useState(false);

    const [tempData, setTempData] = useState(null);

    useEffect(() => {
        
        fetch("/pets/owners/all",
            {
                method: "GET",
                credentials: "include"
            }
        ).then(res => res.json()).then(data => {

            setOwnerList(data);
            setTempData(data);

        });

        fetch("/appointments/type",
        {
            method: "GET",
        }
        ).then(res => res.json()).then(data => {
        
            setServiceList(data);
            
        });


    }, []);
    
    const hideMenu = (e) => {
        
        if (e.classList.value.includes("container")) {
            setMakeAppointment(false);
        }

    };
    
    const getService = (item, id, color) => {
        
        setAppointmentColor(color);
        
        setAppointment(prev => ({...prev, appointment_type: id}));

        setService(item);

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
        
        setBtnActive(prev => ({...prev, step2: true}));
    };

    const showCalendar = () => {
        setCalendar(true)

        if (calendar) {
            setCalendar(false);
        }
    };
    
    const getPet = (petName, id) => {

        setAppointment(prev => ({...prev, id_pet: id}));
        setPet(petName);
        
        setBtnActive(prev => ({...prev, step3: true}));

    };
    
    const saveAppointment = (date) => {

        const cookie = getCookie("csrfToken");

        fetch("/appointment",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "CSRF-TOKEN": cookie
            },
            body: JSON.stringify({"date_appointment": `${date.year}-${date.monthIndex}-${date.date} ${date.hour}`, "id_pet": appointment.id_pet, "id_owner": appointment.id_owner, "appointment_type": appointment.appointment_type})
        }).then(res =>{ 
            
            if (!res.ok) {
                setError(true);
            }
            else{
                return res.json()
            }
            
        }).then(data => {
            
            if (data.status) {
                
                let data = JSON.parse(JSON.stringify(appointmentsWeek));

                let newObj = data.map((elm, i) => {
            
                    return {[arr[i]]: elm[arr[i]].map(item => {

                        if (item.dateDay === date.date && item.day === date.day && item.time === date.hour) {
                            item.appointmentName = service;
                            item.nameOwner = owner;
                            item.namePet = pet;
                            item.color = appointmentColor;
                        }
                        return item;
                    })};
                });

                setAppointmentsWeek(newObj);
                setAppMessage(true);

                setMakeAppointment(false);
                
                setMessageContent("Appointment created");

                socket.emit("new appointment", "");
            }
            
        });

    };
    
    const searchName = (e) => {

        const newObj = tempData.filter(elm => elm.nameOwner.includes(e));

        setOwnerList(newObj);

        if (e === "") {

            setOwnerList(tempData);
        }

    };

    if (error) {
        
        return <Redirect to="/login"/>
    };

    return (

        <div className={styles.container} onClick={(e) => hideMenu(e.target)}>
            
            <form className={styles.form}>
                <h2>Add Appointment</h2>
                <div className={styles.setup}>
                    <div className={styles.service}>
                        <DropdownEdit title={service} defaultTitle={"Add service"} center={true}>
                            <div className={styles.service_dropdown}>
                                {serviceList.map( item => {

                                return (
                                        <button key={item.id} onClick={() => getService(item.appointmentName, item.id, item.color)}>{item.appointmentName}</button>
                                    )
                                })}
                            </div>
                        </DropdownEdit>
                    </div>
                    <div className={styles.owner}>
                        <GenericDropdown title={owner || "Add owner"} center={true} search={true} event={searchName}>
                            <div className={styles.owner_dropdown}>
                                {ownerList.map((item, index) => {
                                    
                                    return (
                                        <button key={item.id} onClick={() => getOwnerPets(item.nameOwner, item.id)}>{item.nameOwner}</button>
                                    )
                                })}
                            </div>
                        </GenericDropdown>
                    </div>
                    {btnActive.step2 && <div className={styles.pet}>
                        <DropdownEdit title={pet} defaultTitle={"Add pet"} center={true}>
                            <div className={styles.pet_dropdown}>
                                {petList.map((item, index) => {
                                    
                                    return (
                                        <button key={item.id} onClick={() => getPet(item.namePet, item.id)}>{item.namePet}</button>
                                    )
                                })}
                            </div>
                        </DropdownEdit>
                    </div>}
                    <div className={styles.date}>

                        {!date ?
                            <button type="button" btnclassdate={calendar.toString()} onClick={() => showCalendar()}>Add date</button> : 
                            <div className={styles.date_selected}>
                                <span>{date.day}, {date.date} {date.month.substring(0, 3)} {date.hour}</span>
                                <button type="button" onClick={() => showCalendar()}>Edit</button>
                            </div>
                        }
                        {calendar && <Calendar setDate={setDate} date={date} setCalendar={setCalendar} setBtnActive={setBtnActive} />}
                        
                    </div>
                </div>
                <div className={styles.submit_btn}>
                    <button type="button" onClick={() => setMakeAppointment(false)}>Cancel</button>
                    {btnActive.step1 && btnActive.step2 && btnActive.step3 && btnActive.step4 ? 
                        <button type="button" className={styles.save_btn} onClick={() => saveAppointment(date)}>Save appointment</button> :
                        <button type="button" className={styles.save_btn_dis}>Save appointment</button> 
                    }
                    
                </div>
            </form>
        </div>

    );
};

export default AddAppointment;