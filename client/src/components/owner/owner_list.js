import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/owner/owner_list.scss";

import Edit from "../../assets/edit_.svg";
import Profile from "../../assets/profile_filled_black.svg";

import ArrowLeft from "../../assets/arrow_left_.svg";

const OwnerList = () => {

    const arr = [{"name": "name last name", "email": "example@example.com", "phoneNumber": ["8888-8888"], "address": "address", "registerDate": "01-01-01"},
                {"name": "name last name", "email": "example@example.com", "phoneNumber": ["8888-8888", "0000-0000"], "address": "address", "registerDate": "01-01-01"}];

    const categories = ["Name", "Email", "Phone Number", "Address", "Register Date"];

    const [showOptions, setShowOptions] = useState(null);

    const [showListTelephones, setShowListTelephones] = useState(false);

    const [indexTel, setIndexTel] = useState(null);

    const getOptions = (index) => {
        setShowOptions(index);

        if (showOptions !== null) {
            setShowOptions(null);
        }
    };

    const getTelephoneList = (index) => {
        setShowListTelephones(true);
        setIndexTel(index);

        if (showListTelephones) {
            setShowListTelephones(false);
            setIndexTel(null);
        }
    };

    return (
        <section className="main-owner-list-container">
            <ul className="categories-list">
                {categories.map((elm, index) => {

                    return (
                        <li key={index}>{elm}</li>
                    )
                })}
            </ul>
            <ul className="owner-list">

                {arr.map((elm, index) => {

                    return (
                        <li key={index} className="item-list">
                            <div className="checkbox">
                                <input type="checkbox" />
                            </div>
                            <span>{elm.name}</span>
                            <span>{elm.email}</span>
                            <div>
                                {elm.phoneNumber.length > 1 ? 
                                    <button onClick={() => getTelephoneList(index)} rot={showListTelephones.toString()}>{elm.phoneNumber.length} phones <img src={ArrowLeft} alt="more" /> </button> :
                                    <span>{elm.phoneNumber}</span>
                                }
                                {showListTelephones && indexTel === index && <ul className="tel-list">
                                    {elm.phoneNumber.map((item, index) => {

                                        return <li key={index}>{item}</li>
                                    })}
                                </ul>}
                            </div>
                            
                            <span>{elm.address}</span>
                            <span>{elm.registerDate}</span>
                            <button className="dot-container" onClick={() => getOptions(index)}>
                                <div className="dot"/>
                                <div className="dot"/>
                                <div className="dot"/>
                            </button>
                            { showOptions === index && <div className="owner-options">
                                <Link to={`/owner/${index}`}> <img src={Profile} alt="profile" /> Owner profile</Link>
                                <Link to={`/owner/${index}`}> <img src={Edit} alt="edit"/> Edit</Link>
                            </div>}
                        </li>
                    )
                })}
            </ul>
            
        </section>
    );
};

export default OwnerList;