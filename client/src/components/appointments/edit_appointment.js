import React, { useState, useEffect } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";

import Calendar from "../calendar/calendar";
import DropdownEdit from "../misc/dropdown_edit";

import styles from "../../styles/appointment/edit.module.scss";

const EditAppointment = ({ setAppointmentsWeek, appointmentsWeek, setAppMessage, socket, setMessageContent }) => {

    const location = useLocation();

    const history = useHistory();

    const { appointmentName, dateDay, day, idDB, month, nameOwner, namePet, time, year, monthIndex, id, color } = location.state;

    const [calendar, setCalendar] = useState(false);

    const [service, setService] = useState(appointmentName);

    const [owner, setOwner] = useState(nameOwner);
    
    const [pet, setPet] = useState(namePet);

    const [btnActive, setBtnActive] = useState({step1: true, step2: true, step3: true, step4: true});

    const [ownerList, setOwnerList] = useState([]);

    const [petList, setPetList] = useState([]);

    const [serviceList, setServiceList] = useState([]);

    const [appointment, setAppointment] = useState({"id_pet": "", "id_owner": "", "appointment_type": ""});

    const [appointmentColor, setAppointmentColor] = useState("");

    const [tempDate, setTempDate] = useState(null);

    const [date, setDate] = useState(null);
    
    useEffect(() => {
        
        setDate({"day": day, "date": dateDay, "month": month, "monthIndex": monthIndex,"year": year, "hour": time});
        setTempDate({"day": day, "date": dateDay, "month": month, "monthIndex": monthIndex,"year": year, "hour": time});

        fetch("/owners",
            {
                method: "GET",
            }
        ).then(res => res.json()).then(data => {

            const found = data.find(elm => elm.nameOwner === nameOwner);

            fetch("/owner/pets",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"id": found.id})
                }
            ).then(res => res.json()).then(data => {

                const found = data.find(elm => elm.namePet === namePet);

                setAppointment(prev => ({...prev, id_pet: found.id}));

            });

            setOwnerList(data);

            setAppointment(prev => ({...prev, id_owner: found.id}));

        });

        fetch("/appointments/type",
        {
            method: "GET",
        }
        ).then(res => res.json()).then(data => {
        
            setServiceList(data);

            const found = data.find(elm => elm.appointmentName === appointmentName);

            setAppointment(prev => ({...prev, appointment_type: found.id}));

        });


    }, []);
    
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
    
    const editAppointment = (date) => {

        fetch("/appointment",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"date_appointment": `${date.year}-${date.monthIndex}-${date.date} ${date.hour}`, "id_pet": appointment.id_pet, "id_owner": appointment.id_owner, "appointment_type": appointment.appointment_type, "id": idDB})
        }
        ).then(res => res.json()).then(data => {

            if (data.status) {
                
                const data = JSON.parse(JSON.stringify(appointmentsWeek));

                const found = data.find(elm => elm.hasOwnProperty(day));

                const datesWeek = [ data[0]["Monday"][0].dateDay, data[4]["Friday"][0].dateDay];
                
                if (date.date < datesWeek[0] || date.date > datesWeek[1]) { 

                    //if date selected doesn't fall into the week the user is currently viewing, remove all info from corresponding appointment card

                    found[day].forEach(elm => {

                        if (elm.id === id) {

                            elm.namePet = "";
                            elm.nameOwner = "";
                            elm.color = "";
                            elm.appointmentName = "";
                        }
                    });

                    data.forEach(elm => {
                        if (elm[day]) {

                            elm[day] = found[day];

                        }
                    });
                    setAppointmentsWeek(data);
                    
                }
                else{

                    //if user doesn't change date but time

                    if (date.day === tempDate.day) {
                        
                        found[day].forEach(elm => {

                            if (elm.id === id) {
    
                                elm.namePet = "";
                                elm.nameOwner = "";
                                elm.color = "";
                                elm.appointmentName = "";
                                
                            }

                            if (elm.time === date.hour) {
                                
                                elm.namePet = pet;
                                elm.nameOwner = owner;
                                elm.color = appointmentColor || color;
                                elm.appointmentName = service;

                            }

                        });

                        setAppointmentsWeek(data);
                        
                    }
                    else{

                        //if user changes date

                        found[tempDate.day].forEach(elm => {

                            if (elm.time === tempDate.hour) {
    
                                elm.namePet = "";
                                elm.nameOwner = "";
                                elm.color = "";
                                elm.appointmentName = "";
                                
                            }
                            
                        });

                        const weekFound = data.find(elm => elm.hasOwnProperty(date.day));

                        weekFound[date.day].forEach(elm => {

                            if (elm.time === date.hour) {
    
                                elm.namePet = pet;
                                elm.nameOwner = owner;
                                elm.color = appointmentColor || color;
                                elm.appointmentName = service;
                                
                            }

                        });

                        setAppointmentsWeek(data);
                    }

                    socket.emit("new appointment", "");
                }

                history.push("/appointments");

                setMessageContent("Appointment edited");

                setAppMessage(true);
            }
        });

    };
    
    return (

        <div className={styles.appointment_container}>
            
            <form className={styles.form}>
                <h2>Edit Appointment</h2>
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
                        <DropdownEdit title={owner} defaultTitle={"Add owner"} center={true}>
                            <div className={styles.owner_dropdown}>
                                {ownerList.map((item, index) => {

                                    return (
                                        <button key={item.id} onClick={() => getOwnerPets(item.nameOwner, item.id)}>{item.nameOwner}</button>
                                    )
                                })}
                            </div>
                        </DropdownEdit>
                    </div>
                    {btnActive.step2 && <div className={styles.pet}>
                        <DropdownEdit title={pet} defaultTitle={"Add pet"} center={true}>
                            <div className={styles.owner_dropdown}>
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

                    <Link to="/appointments">Cancel</Link>

                    <button type="button" className={styles.save_btn} onClick={() => editAppointment(date)}>Edit appointment</button>
                    
                </div>
            </form>
            
        </div>

    );
};

export default EditAppointment;