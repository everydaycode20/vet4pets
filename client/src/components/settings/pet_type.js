import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch, NavLink } from "react-router-dom";

import GenericDropdown from "../misc/generic_dropdown";

import "../../styles/settings/pet_type.scss";

const PetTypeMsg = ({ setMessage, message }) => {

    return (
        <div className="type-message" style={{borderLeft: `5px solid black`}} onAnimationEnd={() => setMessage(false)}>
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
        <div className="inner-pet-type-container">

            <h2>Add a new pet type</h2>
            <form className="form-type" onSubmit={e => addType(e)}>
                
                <div className="description">
                    <label htmlFor="description">Description</label>
                    <input name="description" id="description" cols="30" rows="5" onChange={() => setErrorMessage(prev => ( {...prev, description: {status: true } } ) ) }/>
                </div>
                {!errorMessage.description.status && <div className="error">{errorMessage.description.message}</div>}

                <GenericDropdown title={breedType || "Select a breed"}>
                    <div className="breed-dropdown">
                        {breedList.map(item => {
                            
                            return <button type="button" key={item.id} onClick={() => getBreed(item.breedDescription, item.id)}>{item.breedDescription}</button>
                        })}
                    </div>
                </GenericDropdown>
                {!errorMessage.breed.status && <div className="error">{errorMessage.breed.message}</div>}

                <button>Add pet type</button>
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
        <div className="inner-breed-type-container">
            <h2>Add a new breed type</h2>

            <form className="form-type" onSubmit={e => addBreedType(e)}>
            
                <div className="description">
                    <label htmlFor="description">Description</label>
                    <input name="description" id="description" cols="30" rows="5" onChange={() => setErrorMessageBreed(prev => ( {...prev, description: {status: true } } ) ) }/>
                </div>
                
                {!errorMessageBreed.description.status && <div className="error">{errorMessageBreed.description.message}</div>}

                <button>Add breed type</button>
            </form>
        </div>
    );
}

const Type = () => {

    let { path, url } = useRouteMatch();

    const [message, setMessage] = useState({status: false, message: ""});

    return (
        <div className="pet-type-container">

            <div className="main-pet-type-container">
                <div className="btn-group">
                    <NavLink className="link" activeClassName="active" exact to={path}>Pet</NavLink>
                    <NavLink className="link" to={`${url}/breed`}>Breed</NavLink>
                </div>

                <Switch>
                    <Route exact path={path}>
                        <PetType setMessage={setMessage}/>
                    </Route>
                    <Route path={path}>
                        <Breed setMessage={setMessage}/>
                    </Route>
                </Switch>
            </div>

            {message.status && <PetTypeMsg setMessage={setMessage} message={message}/>}

            <Link to="/settings" className="link-background"/>
        </div>
    );
};

export default Type;