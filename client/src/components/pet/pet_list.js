import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Pet from "../../assets/pet_filled_black.svg";
import DotBtn from "../misc/dot_btn";

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

        if (showOptions) {
            setShowOptions(null);
        }
        else{
            setShowOptions(index);
        }
    };

    const hideOptions = (e) => {

        if (!e.currentTarget.contains(e.relatedTarget)) {
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
                            
                            <DotBtn id={elm.id}>
                                <div className="owner-options" >
                                    <div className="pet-options">
                                        <Link to={{pathname: `/pets/${elm.id}`, state: "obj"}} onClick={() => setShowOptions(null)}> <img src={Pet} alt="profile" /> Owner profile</Link>
                                        <Link to={`/pets`}> <img src={Edit} alt="edit"/> Edit</Link>
                                    </div>
                                </div>
                            </DotBtn>

                        </li>
                    )
                })}
            </ul>
            
        </section>
    );
};

export default PetList;