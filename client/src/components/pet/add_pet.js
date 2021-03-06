import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import GenericDropdown from "../misc/generic_dropdown";

import getCookie from "../../utils/getCookie";

import styles from "../../styles/pet/add_pet.module.scss";

const AddPet = ({ setAddPet, setPetMessage, petList, setPetList }) => {

    const [ownersList, setOwnersList] = useState([]);

    const [ownerName, setOwnerName] = useState("");

    const [ownerId, setOwnerId] = useState("");

    const [petTypeList, setPetTypeList] = useState([]);

    const [type, setType] = useState({typeName: "", idType: "", typeBreed: "", idBreed: ""});

    const [tempData, setTempData] = useState(null);

    const [errorMessage, setErrorMessage] = useState( { "name":{"status": true, "message": ""}, "age": {"status": true, "message": ""},
        "type": {"status": true, "message": ""}, "owner": {"status": true, "message": ""} } );

    const [error, setError] = useState(false);

    useEffect(() => {
        

        fetch("/pets/owners",
        {
            method: "GET",
        }
        ).then(res => res.json()).then(data => {
            
            setOwnersList(data);
            setTempData(data);
        });

        fetch("/pets/type",
        {
            method: "GET",
        }
        ).then(res => res.json()).then(data => {

            setPetTypeList(data);

        });

    }, []);
    
    const hideMenu = (e) => {
        
        if (e.classList.value.includes("container")) {
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

    function addPet(e) {

        e.preventDefault();

        const cookie = getCookie("csrfToken");

        const { name, age } = e.target.elements;

        if (name.value === "") {
            setErrorMessage(prev => ({ ...prev, name: { status: false, message: "there should be a name" } }));
        }
        else if (age.value === "") {
            setErrorMessage(prev => ({ ...prev, age: { status: false, message: "you should type an age" } }));
        }
        else if (type.typeName === "") {
            setErrorMessage(prev => ({ ...prev, type: { status: false, message: "you should select a type" } }));
        }
        else if (ownerName === "") {
            setErrorMessage(prev => ({ ...prev, owner: { status: false, message: "you should select an owner" } }));
        }
        else {
            fetch("/pet",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "CSRF-TOKEN": cookie
                    },
                    body: JSON.stringify({ id_owner: ownerId, name: name.value, age: age.value, id_type: type.idType })
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
                    
                    setAddPet(false);
                    setPetMessage(true);

                    const obj = {age: age.value, id: Math.random(), nameOwner: ownerName, namePet: name.value, registerDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, type: type.typeName};
                    
                    const sortedArray = [ ...petList, obj ].sort((a, b) => {

                        if (a.namePet < b.namePet) {
                            return -1;
                        }
                        if (a.namePet > b.namePet) {
                            return 1;
                        }

                        return 0;

                    });
                    
                    setPetList(sortedArray );
                }

            });
        }

    }
        
    const searchName = (e) => {

        const newObj = tempData.filter(elm => elm.nameOwner.includes(e));

        setOwnersList(newObj);

        if (e === "") {

            setOwnersList(tempData);
        }

    };

    if (error) {
        
        return <Redirect to="/login"/>
    };
    
    return (

        <div className={styles.container} onClick={(e) => hideMenu(e.target)}>
            <form className={styles.form} onSubmit={e => addPet(e)}>
                
                <div className={styles.name}>
                    <label htmlFor="name">Pet name</label>
                    <input type="text" name="name" id="name" className={styles.input}/>
                </div>
                {!errorMessage.name.status && 
                    <div>
                        <span className={styles.error}>{errorMessage.name.message}</span>
                    </div>
                }
                <div className={styles.age}>
                    <label htmlFor="age">Age</label>
                    <input type="text" name="age" id="age" className={styles.input}/>
                </div>
                {!errorMessage.age.status && 
                    <div>
                        <span className={styles.error}>{errorMessage.age.message}</span>
                    </div>
                }
                <div className={styles.type}>
                    <GenericDropdown title={type.typeName ? type.typeName + "-" + type.typeBreed : "Choose a type"} >
                        <div className={styles.pet_dropdown}>
                            {petTypeList.map(type => {

                                return <button key={type.idType} onClick={() => getType(type.typeDescription, type.idType, type.breedDescription, type.idBreed)}>{type.typeDescription}-{type.breedDescription}</button>
                            })}
                        </div>
                    </GenericDropdown>
                </div>
                {!errorMessage.type.status && 
                    <div>
                        <span className={styles.error}>{errorMessage.type.message}</span>
                    </div>
                }
                <div className={styles.owner}>
                    <GenericDropdown title={ownerName || "Choose an owner"} search={true} data={ownersList} setData={setOwnersList} event={searchName}>
                        <div className={styles.owner_dropdown}>
                            {ownersList.map(owner => {

                                return <button key={owner.id} onClick={() => getOwner(owner.nameOwner, owner.id)}>{owner.nameOwner}</button>
                            })}
                        </div>
                    </GenericDropdown>
                    {!errorMessage.owner.status && 
                        <div>
                            <span className={styles.error}>{errorMessage.owner.message}</span>
                        </div>
                    }

                </div>

                <button type="submit" className={styles.submit_owner}>Add new pet</button>

            </form>
        </div>

    );

};

export default AddPet;