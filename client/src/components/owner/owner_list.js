import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Profile from "../../assets/profile_filled_black.svg";
import Arrow from "../../assets/arrow_left_.svg";
import DotBtn from "../misc/dot_btn";
import TelBtn from "../misc/tel_btn";

import Skeleton from "../misc/skeleton";
import AddressDropdown from "../misc/address_dropdown";
import Categories from "./owner_list_categories";

import styles from "../../styles/owner/owner_list.module.scss";

const OwnerList = memo(({ setNumberOwners, setOwnerList, ownerList, setTempList, filterType }) => {
    
    const categories = ["Email", "Phone Number", "Address"];

    const [loading, setLoading] = useState(true);
    
    const [sortType, setSortType] = useState("asc");

    const [dateSortType, setDateSortType] = useState("asc");

    useEffect(() => {

        setLoading(true);

        fetch("/owners", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setOwnerList(data);

            setTempList(data);

            setNumberOwners(data.length);
            setLoading(false);

        }).catch(err => console.log(err));

    }, []);



    return (
        
        <section className={styles.list}>

            <Categories filterType={filterType} ownerList={ownerList} setOwnerList={setOwnerList} setLoading={setLoading} setTempList={setTempList} />

            {loading ? <Skeleton height={41} backgroundColor={"#CDF0EA"} number={3} width={90}/> :
            
            <ul className={styles.owner}>

                {ownerList.map((elm, index) => {

                    const obj = [{"id": elm.id, "telephones": elm.telephones, "address": elm.address, "nameOwner": elm.nameOwner, "email": elm.email, "registered": elm.registerDate}];

                    return (
                        <li key={elm.id} className={styles.item}>
                            {/* <div className="checkbox">
                                <input type="checkbox" onChange={() => console.log("test")}/>
                            </div> */}
                            <span>{elm.nameOwner}</span>
                            <span>{elm.email}</span>
                            
                            <TelBtn elm={elm}/>
                            
                            <AddressDropdown address={elm.address} id={elm.id}/>

                            <span>{elm.registerDate}</span>

                            <DotBtn id={elm.id}>
                                <div className={styles.options} >
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
        
    );
});

export default OwnerList;