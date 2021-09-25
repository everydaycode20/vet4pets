import React, { useState, useEffect } from "react";

import GenericDropdown from "../misc/generic_dropdown";

import "../../styles/owner/add_owner.scss";

const AddAppointment = ({ setAddNewOwner, setOwnerMessage, setOwnerList, ownerList }) => {

    const [telephoneTypes, setTelephoneTypes] = useState([]);

    const [telephoneType, setTelephoneType] = useState("");

    const [telephoneTypeId, setTelephoneTypeId] = useState("");

    const [errorMessage, setErrorMessage] = useState( { "name":{"status": true, "message": ""}, "phone": {"status": true, "message": ""},
        "email": {"status": true, "message": ""}, "address": {"status": true, "message": ""}, "phoneType": {"status": true, "message": ""} } );

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
        
        if (e.classList.contains("add-owner-container")) {
            setAddNewOwner(false);
        }

    };
    
    const getTelephone = (telephone, id) => {

        setTelephoneType(telephone);

        setTelephoneTypeId(id);

    };

    const addOwner = (e) => {
        
        e.preventDefault();

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
        else if (address.value === "") {
            setErrorMessage(prev => ({...prev, address: {status: false, message: "there should be an address"}}));
        }
        else{
            fetch("/owner",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"name": name.value, "email": email.value, "address": address.value, "phone": telephone.value, "idPhone": telephoneTypeId})
            }
            ).then(res => res.json()).then(data => {

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

    return (

        <div className="add-owner-container" onClick={(e) => hideMenu(e.target)}>
            <form className="main-owner-form-container" onSubmit={e => addOwner(e)}>
                
                <div className="owner-name">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                {!errorMessage.name.status && 
                    <div>
                        <span className="error">{errorMessage.name.message}</span>
                    </div>
                }
                <div className="owner-phone">
                    <GenericDropdown title={telephoneType || "Choose a telephone type"}>
                        <div className="phone-dropdown">
                            {telephoneTypes.map(tel => {

                                return <button key={tel.id} onClick={() => getTelephone(tel.phoneType, tel.id)}>{tel.phoneType}</button>
                            })}
                        </div>
                    </GenericDropdown>
                    {!errorMessage.phoneType.status && 
                        <div>
                            <span className="error">{errorMessage.phoneType.message}</span>
                        </div>
                    }
                    <label htmlFor="telephone">Telephone</label>
                    <input type="text" name="telephone" id="telephone" />
                </div>
                {!errorMessage.phone.status && 
                    <div>
                        <span className="error">{errorMessage.phone.message}</span>
                    </div>
                }
                <div className="owner-email">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email"/>
                </div>
                {!errorMessage.email.status && 
                    <div>
                        <span className="error">{errorMessage.email.message}</span>
                    </div>
                }
                <div className="owner-address">
                    <label htmlFor="address">Address</label>
                    <textarea name="address" id="address" cols="30" rows="5" ></textarea>
                </div>
                {!errorMessage.address.status && 
                    <div>
                        <span className="error">{errorMessage.address.message}</span>
                    </div>
                }
                <button type="submit" className="submit-owner">Add new owner</button>

            </form>
        </div>

    );

};

export default AddAppointment;