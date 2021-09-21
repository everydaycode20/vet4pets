import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Pet from "../../assets/pet_filled_black.svg";

const PetList = ( { setNumberPets }) => {

    const arr = [{"name": "pet name", "ownerName": "owner name", "age": 10, "type": "dog", "registerDate": "01-01-01"},
                {"name": "pet name", "ownerName": "owner name", "age": 10, "type": "cat", "registerDate": "01-01-01"}];

    const categories = ["Name", "Owner Name", "Age", "Type", "Register Date"];

    const [showOptions, setShowOptions] = useState(null);

    const [petList, setPetList] = useState([]);

    useEffect(() => {
        
        fetch("/pets", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setPetList(data);

            setNumberPets(data.length);
            
        }).catch(err => console.log(err));

    }, []);

    const getOptions = (index) => {
        setShowOptions(index);

        if (showOptions !== null) {
            setShowOptions(null);
        }
    };

    return (
        <section className="main-pet-list-container">
            <ul className="categories-list">
                {categories.map((elm, index) => {

                    return (
                        <li key={index}>{elm}</li>
                    )
                })}
            </ul>
            <ul className="pet-list">

                {petList.map((elm, index) => {

                    return (
                        <li key={elm.id} className="item-list">
                            <div className="checkbox">
                                <input type="checkbox" />
                            </div>
                            <span>{elm.namePet}</span>
                            <span>{elm.nameOwner}</span>
                            <span>{elm.age}</span>
                            <span>{elm.type}</span>
                            <span>{elm.registerDate}</span>
                            <button className="dot-container" onClick={() => getOptions(index)}>
                                <div className="dot"/>
                                <div className="dot"/>
                                <div className="dot"/>
                            </button>
                            { showOptions === index && <div className="pet-options">
                                <Link to={`/pet/${index}`}> <img src={Pet} alt="profile" /> Pet profile</Link>
                                <Link to={`/pet/${index}`}> <img src={Edit} alt="edit"/> Edit</Link>
                            </div>}
                        </li>
                    )
                })}
            </ul>
            
        </section>
    );
};

export default PetList;