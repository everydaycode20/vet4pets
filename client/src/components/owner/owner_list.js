import React, { useState, useEffect, useRef } from "react";
import { Link, Switch, Router, Route } from "react-router-dom";

import "../../styles/owner/owner_list.scss";

import Edit from "../../assets/edit_.svg";
import Profile from "../../assets/profile_filled_black.svg";
import OwnerProfile from "../owner_profile/owner_profile";
import DotBtn from "../misc/dot_btn";
import TelBtn from "../misc/tel_btn";

import ArrowLeft from "../../assets/arrow_left_.svg";

const OwnerList = ({ setNumberOwners }) => {

    const categories = ["Name", "Email", "Phone Number", "Address", "Register Date"];

    const [showListTelephones, setShowListTelephones] = useState(false);

    const [indexTel, setIndexTel] = useState(null);

    const [ownerList, setOwnerList] = useState([]);

    useEffect(() => {
        
        fetch("/owners", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setOwnerList(data);

            setNumberOwners(data.length);
            
        }).catch(err => console.log(err));

    }, []);

    const getTelephoneList = (index) => {

        setShowListTelephones(true);

        setIndexTel(index);
        
        if (showListTelephones) {
            setShowListTelephones(false);
            setIndexTel(null);
        }
    };

    return (
        <div>
        <section className="main-owner-list-container">
            <ul className="categories-list">
                {categories.map((elm, index) => {

                    return (
                        <li key={index}>{elm}</li>
                    )
                })}
            </ul>
            <ul className="owner-list">

                {ownerList.map((elm, index) => {

                    const obj = [{"id": elm.id, "telephones": elm.telephones, "address": elm.address, "nameOwner": elm.nameOwner, "email": elm.email, "registered": elm.registerDate}];

                    return (
                        <li key={elm.id} className="item-list">
                            <div className="checkbox">
                                <input type="checkbox" />
                            </div>
                            <span>{elm.nameOwner}</span>
                            <span>{elm.email}</span>
                            
                            <TelBtn elm={elm}/>
                            
                            <span>{elm.address}</span>
                            <span>{elm.registerDate}</span>

                            <DotBtn id={elm.id}>
                                <div className="owner-options" >
                                    <Link to={{pathname: `/owners/${elm.id}`, state: obj}}> <img src={Profile} alt="profile" /> Owner profile</Link>
                                    <Link to={`/owners`}> <img src={Edit} alt="edit"/> Edit</Link>
                                </div>
                            </DotBtn>

                        </li>
                    )
                })}
            </ul>
            
        </section>
        <Switch>
            <Route path="/owners/:id">
                <OwnerProfile />
            </Route>
        </Switch>
        </div>
    );
};

export default OwnerList;