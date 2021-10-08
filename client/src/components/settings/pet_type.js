import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch, NavLink } from "react-router-dom";

import GenericDropdown from "../misc/generic_dropdown";

import styles from  "../../styles/settings/pet_type.module.scss";

const PetTypeMsg = ({ setMessage, message }) => {

    return (
        <div className={styles.type_message} style={{borderLeft: `5px solid black`}} onAnimationEnd={() => setMessage(false)}>
            <span>{message.message}</span>
        </div>
    );
};

const PetType = ({ setMessage }) => {

    const [errorMessage, setErrorMessage] = useState( { "description": {"status": true, "message": ""}, "breed": {"status": true, "message": ""} } );

    const [breedType, setBreedType] = useState("");

    const [breedList, setBreedList] = useState([]);

    const [breedId, setBreedId] = useState("");

    useEffect(() => {
        
        fetch("/pets/type/breed", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setBreedList(data);

        }).catch(err => console.log(err));

    }, []);

    const addType = (e) => {

        e.preventDefault();

        const { description } = e.target.elements;
        
        if (description.value === "") {

            setErrorMessage(prev => ({...prev, description: {status: false, message: "there should be a description"}}));

        }
        else if (breedType === "") {
            
            setErrorMessage(prev => ({...prev, breed: {status: false, message: "You should select a breed"}}));

        }
        else{
            fetch("/pet/type", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({type_description: description.value, id_breed: breedId})
            }).then(res => res.json()).then(data => {

                if (!data.status) {
                    
                    setErrorMessage(prev => ({...prev, description: {status: false, message: data.message}}));

                }
                else{
                    setMessage(prev => ({...prev, status: true, message: "Pet type added"} ) );
                }

            }).catch(err => console.log(err));
        }

    };

    const getBreed = (breed, id) => {

        setBreedType(breed);

        setBreedId(id);

        setErrorMessage(prev => ({...prev, breed: { status: true } } ) );

    };
    
    return (
        <div className={styles.pet_container}>

            <h2>Add a new pet type</h2>
            <form className={styles.form} onSubmit={e => addType(e)}>
                
                <div className={styles.description}>
                    <label htmlFor="description">Description</label>
                    <input name="description" id="description" cols="30" rows="5" onChange={() => setErrorMessage(prev => ( {...prev, description: {status: true } } ) ) }/>
                </div>
                {!errorMessage.description.status && <div className={styles.error}>{errorMessage.description.message}</div>}

                <GenericDropdown title={breedType || "Select a breed"}>
                    <div className={styles.breed_dropdown}>
                        {breedList.map(item => {
                            
                            return <button type="button" key={item.id} onClick={() => getBreed(item.breedDescription, item.id)}>{item.breedDescription}</button>
                        })}
                    </div>
                </GenericDropdown>
                {!errorMessage.breed.status && <div className={styles.error}>{errorMessage.breed.message}</div>}

                <button className={styles.submitBtn}>Add pet type</button>
            </form>
                
        </div>
    );
};

const Breed = ({ setMessage }) => {

    const [errorMessageBreed, setErrorMessageBreed] = useState({"description": {"status": true, "message": ""} } );

    const addBreedType = (e) => {

        e.preventDefault();

        const { description } = e.target.elements;
        
        if (description.value === "") {

            setErrorMessageBreed(prev => ({...prev, description: {status: false, message: "there should be a description"}}));

        }
        else{
            fetch("/pet/type/breed", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify( { breed_description: description.value } )
            }).then(res => res.json()).then(data => {

                if (!data.status) {
                    
                    setErrorMessageBreed(prev => ({...prev, description: {status: false, message: data.message } } ));

                }
                else{

                    setMessage(prev => ({...prev, status: true, message: "Breed type added"} ) );

                }

            }).catch(err => console.log(err));
        }

    };

    return (
        <div className={styles.breed_container}>
            <h2>Add a new breed type</h2>

            <form className={styles.form} onSubmit={e => addBreedType(e)}>
            
                <div className={styles.description}>
                    <label htmlFor="description">Description</label>
                    <input name="description" id="description" cols="30" rows="5" onChange={() => setErrorMessageBreed(prev => ( {...prev, description: {status: true } } ) ) }/>
                </div>
                
                {!errorMessageBreed.description.status && <div className={styles.error}>{errorMessageBreed.description.message}</div>}

                <button>Add breed type</button>
            </form>
        </div>
    );
}

const Type = () => {

    let { path, url } = useRouteMatch();
    console.log(path, url);
    const [message, setMessage] = useState({status: false, message: ""});
    
    const [active, setActive] = useState(false);

    const checkActive = (match, location) => {
        
        if (!match) {
            setActive(false);
            return false;
        }
        
        setActive(true);

        const eventID = parseInt(match.params.eventID);
        return !isNaN(eventID) && eventID % 2 === 1;
    }
    
    return (
        <div className={styles.container}>

            <div className={styles.main}>
                <div className={styles.btn_group}>
                    <NavLink className={styles.link} style={{backgroundColor: active ? "white" : "#135A5A", color: active ? "black" : "white"}} exact isActive={checkActive} to={path}>Pet</NavLink>
                    <NavLink className={styles.link} style={{backgroundColor: !active ? "white" : "#135A5A", color: !active ? "black" : "white"}} to={`${url}/breed`}>Breed</NavLink>
                </div>

                <Switch>
                    <Route exact path={path}>
                        <PetType setMessage={setMessage}/>
                    </Route>
                    <Route path={`${url}/breed`}>
                        <Breed setMessage={setMessage}/>
                    </Route>
                </Switch>
            </div>

            {message.status && <PetTypeMsg setMessage={setMessage} message={message}/>}

            <Link to="/settings" className={styles.link_background}/>
        </div>
    );
};

export default Type;