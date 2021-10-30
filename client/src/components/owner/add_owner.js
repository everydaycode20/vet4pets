import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import GenericDropdown from "../misc/generic_dropdown";

import getCookie from "../../utils/getCookie";

import styles from "../../styles/owner/add_owner.module.scss";

const AddOwner = ({ setAddNewOwner, setOwnerMessage, setOwnerList, ownerList }) => {

    const [telephoneTypes, setTelephoneTypes] = useState([]);

    const [telephoneType, setTelephoneType] = useState("");

    const [telephoneTypeId, setTelephoneTypeId] = useState("");

    const [errorMessage, setErrorMessage] = useState( { "name":{"status": true, "message": ""}, "phone": {"status": true, "message": ""},
        "email": {"status": true, "message": ""}, "address": {"status": true, "message": ""}, "phoneType": {"status": true, "message": ""} } );

    const [error, setError] = useState(false);

    useEffect(() => {
        
        fetch("/telephones/type",
        {
            method: "GET",
        }
        ).then(res => res.json()).then(data => {

            setTelephoneTypes(data);

        });

    }, []);
    
    const hideMenu = (e) => {
        
        if (e.classList.value.includes("container")) {
            setAddNewOwner(false);
        }

    };
    
    const getTelephone = (telephone, id) => {

        setTelephoneType(telephone);

        setTelephoneTypeId(id);

    };

    const addOwner = (e) => {

        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/;

        e.preventDefault();
        
        const cookie = getCookie("csrfToken");

        const {name, telephone, email, address} = e.target.elements;

        if (name.value === "") {
            setErrorMessage(prev => ({...prev, name: {status: false, message: "there should be a name"}}));
        }
        else if (telephoneType === "") {
            setErrorMessage(prev => ({...prev, phoneType: {status: false, message: "you should select a phone type"}}));
        }
        else if (telephone.value === "") {
            setErrorMessage(prev => ({...prev, phone: {status: false, message: "there should be a phone"}}));
        }
        else if (email.value === "") {
            setErrorMessage(prev => ({...prev, email: {status: false, message: "there should be an email"}}));
        }
        else if(!regex.test(email.value)){
            setErrorMessage(prev => ({...prev, email: {status: false, message: "email should follow the following pattern: example@example.com"}}));
        }
        else if (address.value === "") {
            setErrorMessage(prev => ({...prev, address: {status: false, message: "there should be an address"}}));
        }
        else{
            fetch("/owner",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "CSRF-TOKEN": cookie
                },
                body: JSON.stringify({"name": name.value, "email": email.value, "address": address.value, "phone": telephone.value, "idPhone": telephoneTypeId})
            }
            ).then(res =>{ 
            
                if (!res.ok) {
                    setError(true);
                }
                else{
                    return res.json()
                }
                
            }).then(data => {

                if (data.status) {
                    setAddNewOwner(false);
                    setOwnerMessage(true);

                    let data = JSON.parse(JSON.stringify(ownerList));
                    
                    data.push({id: Math.random(), nameOwner: name.value, email: email.value, address: address.value, telephones: [telephone.value], idPhone: telephoneTypeId, registerDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`});

                    setOwnerList(data);
                }

            });
        }
        
    };

    if (error) {
        
        return <Redirect to="/login"/>
    };

    return (

        <div className={styles.container} onClick={(e) => hideMenu(e.target)}>
            <form className={styles.form} onSubmit={e => addOwner(e)}>
                
                <div className={styles.name}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                {!errorMessage.name.status && 
                    <div>
                        <span className={styles.error}>{errorMessage.name.message}</span>
                    </div>
                }
                <div className={styles.phone}>
                    <GenericDropdown title={telephoneType || "Choose a telephone type"} center={false}>
                        <div className={styles.phone_dropdown}>
                            {telephoneTypes.map(tel => {

                                return <button key={tel.id}  onClick={() => getTelephone(tel.phoneType, tel.id)}>{tel.phoneType}</button>
                            })}
                        </div>
                    </GenericDropdown>
                    {!errorMessage.phoneType.status && 
                        <div>
                            <span className={styles.error}>{errorMessage.phoneType.message}</span>
                        </div>
                    }
                    <label htmlFor="telephone">Telephone</label>
                    <input type="text" name="telephone" id="telephone"/>
                </div>
                {!errorMessage.phone.status && 
                    <div>
                        <span className={styles.error}>{errorMessage.phone.message}</span>
                    </div>
                }
                <div className={styles.email}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="example@example.com"/>
                </div>
                {!errorMessage.email.status && 
                    <div>
                        <span className={styles.error}>{errorMessage.email.message}</span>
                    </div>
                }
                <div className={styles.address}>
                    <label htmlFor="address">Address</label>
                    <textarea name="address" id="address" cols="30" rows="5" ></textarea>
                </div>
                {!errorMessage.address.status && 
                    <div>
                        <span className={styles.error}>{errorMessage.address.message}</span>
                    </div>
                }
                <button type="submit" className={styles.submit}>Add new owner</button>

            </form>
        </div>

    );

};

export default AddOwner;