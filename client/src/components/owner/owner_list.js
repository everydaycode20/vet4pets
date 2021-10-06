import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "../../styles/owner/owner_list.scss";

import Edit from "../../assets/edit_.svg";
import Profile from "../../assets/profile_filled_black.svg";
import DotBtn from "../misc/dot_btn";
import TelBtn from "../misc/tel_btn";

import Skeleton from "../misc/skeleton";
import AddressDropdown from "../misc/address_dropdown";

const OwnerList = ({ setNumberOwners, setOwnerList, ownerList }) => {

    const categories = ["Name", "Email", "Phone Number", "Address", "Register Date"];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/owners", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setOwnerList(data);

            setNumberOwners(data.length);
            setLoading(false);

        }).catch(err => console.log(err));

    }, []);

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
            {loading ? <Skeleton height={41} backgroundColor={"#CDF0EA"} number={3} width={90}/> :
            
            <ul className="owner-list">

                {ownerList.map((elm, index) => {

                    const obj = [{"id": elm.id, "telephones": elm.telephones, "address": elm.address, "nameOwner": elm.nameOwner, "email": elm.email, "registered": elm.registerDate}];

                    return (
                        <li key={elm.id} className="item-list">
                            {/* <div className="checkbox">
                                <input type="checkbox" onChange={() => console.log("si")}/>
                            </div> */}
                            <span>{elm.nameOwner}</span>
                            <span>{elm.email}</span>
                            
                            <TelBtn elm={elm}/>
                            
                            <AddressDropdown address={elm.address} id={elm.id}/>

                            <span>{elm.registerDate}</span>

                            <DotBtn id={elm.id}>
                                <div className="owner-options" >
                                    <Link to={{pathname: `/owners/${elm.id}`, state: obj}}> <img src={Profile} alt="profile" /> Owner profile</Link>
                                    {/* <Link to={`/owners`}> <img src={Edit} alt="edit"/> Edit</Link> */}
                                </div>
                            </DotBtn>

                        </li>
                    )
                })}
            </ul>
            }
            
        </section>
        </div>
    );
};

export default OwnerList;