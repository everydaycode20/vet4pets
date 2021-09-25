import React, { useState, useEffect } from "react";

import GenericDropdown from "../misc/generic_dropdown";

import "../../styles/pet/add_pet.scss";

const AddPet = ({ setAddPet, setPetMessage }) => {

    const [ownersList, setOwnersList] = useState([]);

    const [ownerName, setOwnerName] = useState("");

    const [ownerId, setOwnerId] = useState("");

    const [petTypeList, setPetTypeList] = useState([]);

    const [type, setType] = useState({typeName: "", idType: "", typeBreed: "", idBreed: ""});

    const [errorMessage, setErrorMessage] = useState( { "name":{"status": true, "message": ""}, "age": {"status": true, "message": ""},
        "type": {"status": true, "message": ""}, "owner": {"status": true, "message": ""} } );

    useEffect(() => {
        

        fetch("/pets/owners",
        {
            method: "GET",
        }
        ).then(res => res.json()).then(data => {
            
            setOwnersList(data);

        });

        fetch("/pets/breed",
        {
            method: "GET",
        }
        ).then(res => res.json()).then(data => {

            setPetTypeList(data);

        });

    }, []);
    
    const hideMenu = (e) => {
        
        if (e.classList.contains("add-owner-container")) {
            setAddPet(false);
        }

    };
    
    const getOwner = (name, id) => {

        setOwnerName(name);

        setOwnerId(id);

    };

    const getType = (typeName, idType, breedName, idBreed) => {
        
        setType(prev => ({ ...prev, typeName: typeName, idType: idType, typeBreed: breedName, idBreed: idBreed}));

    };

    const addOwner = (e) => {
        
        e.preventDefault();

        const {name, age} = e.target.elements;

        if (name.value === "") {
            setErrorMessage(prev => ({...prev, name: {status: false, message: "there should be a name"}}));
        }
        else if (age.value === "") {
            setErrorMessage(prev => ({...prev, age: {status: false, message: "you should type an age"}}));
        }
        else if (type.typeName === "") {
            setErrorMessage(prev => ({...prev, type: {status: false, message: "you should select a type"}}));
        }
        else if (ownerName === "") {
            setErrorMessage(prev => ({...prev, owner: {status: false, message: "you should select an owner"}}));
        }
        else{
            fetch("/pet",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id_owner: ownerId, name: name.value, age: age.value , id_type: type.idType})
            }
            ).then(res => res.json()).then(data => {

                if (data.status) {
                    setAddPet(false);
                    setPetMessage(true);
                }

            });
        }
        
    };

    return (

        <div className="add-owner-container" onClick={(e) => hideMenu(e.target)}>
            <form className="main-owner-form-container" onSubmit={e => addOwner(e)}>
                
                <div className="pet-name">
                    <label htmlFor="name">Pet name</label>
                    <input type="text" name="name" id="name" />
                </div>
                {!errorMessage.name.status && 
                    <div>
                        <span className="error">{errorMessage.name.message}</span>
                    </div>
                }
                <div className="pet-age">
                    <label htmlFor="age">Age</label>
                    <input type="text" name="age" id="age" />
                </div>
                {!errorMessage.age.status && 
                    <div>
                        <span className="error">{errorMessage.age.message}</span>
                    </div>
                }
                <div className="pet-type">
                    <GenericDropdown title={type.typeName ? type.typeName + "-" + type.typeBreed : "Choose a type"}>
                        <div className="pet-dropdown">
                            {petTypeList.map(type => {

                                return <button key={type.idType} onClick={() => getType(type.typeDescription, type.idType, type.breedDescription, type.idBreed)}>{type.typeDescription}-{type.breedDescription}</button>
                            })}
                        </div>
                    </GenericDropdown>
                </div>
                {!errorMessage.type.status && 
                    <div>
                        <span className="error">{errorMessage.type.message}</span>
                    </div>
                }
                <div className="pet-owner">
                    <GenericDropdown title={ownerName || "Choose an owner"}>
                        <div className="owner-dropdown">
                            {ownersList.map(owner => {

                                return <button key={owner.id} onClick={() => getOwner(owner.nameOwner, owner.id)}>{owner.nameOwner}</button>
                            })}
                        </div>
                    </GenericDropdown>
                    {!errorMessage.owner.status && 
                        <div>
                            <span className="error">{errorMessage.owner.message}</span>
                        </div>
                    }

                </div>

                <button type="submit" className="submit-owner">Add new pet</button>

            </form>
        </div>

    );

};

export default AddPet;