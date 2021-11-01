import React, { useState, useEffect } from "react";

import styles, { info, app, addrs, telephone} from "../../styles/owner/owner_profile.module.scss";

const ProfileInfo = ({ id, nameOwner, email, address, telephones, registered }) => {

    const [appointments, setAppointments] = useState({});

    const [petList, setPetList] = useState([]);

    useEffect(() => {
        
        const currentDate = new Date();

        fetch("/appointments/owner/total", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"id_owner": id, "date": `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`})
        }).then(res => res.json()).then(data => {
            
            setAppointments({ past: data.past, upcoming: data.upcoming });
            
        }).catch(err => console.log(err));

        fetch("/owner/pets", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id})
        }).then(res => res.json()).then(data => {
            
            setPetList(data);

        }).catch(err => console.log(err));

    }, []);

    return (
        <React.Fragment>
            <div className={info}>
                <div className="app-email">
                    <h2>{nameOwner}</h2>
                    <span>{email}</span>
                </div>
                    
                <div className={app}>
                    <h3>Appointments</h3>
                    <div>
                        <div>
                            {appointments.past ? <span>{appointments.past}</span> : <span>0</span>}
                            <span>past</span>
                        </div>
                        <div>
                            {appointments.upcoming ? <span>{appointments.upcoming}</span> : <span>0</span>}
                            <span>upcoming</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={info}>
                <div>
                    <h3>Address</h3>
                    <p className={addrs}>{address}</p>
                </div>
                <div className={telephone}>
                    <h3>Telephone</h3>
                    {telephones.map((item, index) => {

                        return (
                            <span key={index}>{item}</span>
                        )
                    })}
                </div>
                <div>
                    <h3>Registered since</h3>
                    <span>{registered}</span>
                </div>
            </div>
            <div className={styles.petList}>
                <h3>Pets</h3>
                <ul>
                    {petList.map(pet => {

                        return <li key={pet.id}>{pet.namePet}</li>
                    })}
                </ul>
            </div>
        </React.Fragment>
    );

};

export default ProfileInfo;