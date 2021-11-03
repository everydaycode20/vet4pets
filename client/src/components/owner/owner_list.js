import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Profile from "../../assets/profile_filled_black.svg";
import Arrow from "../../assets/arrow_left_.svg";
import DotBtn from "../misc/dot_btn";
import TelBtn from "../misc/tel_btn";

import Skeleton from "../misc/skeleton";
import AddressDropdown from "../misc/address_dropdown";

import styles from "../../styles/owner/owner_list.module.scss";

const OwnerList = memo(({ setNumberOwners, setOwnerList, ownerList, setTempList, filterType }) => {
    
    const categories = ["Email", "Phone Number", "Address", "Register Date"];

    const [loading, setLoading] = useState(true);
    
    const [sortType, setSortType] = useState("asc");

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

    const sortByName = () => {

        if (sortType === "asc") {

            setSortType("desc");

            if (filterType === "Pets") {

                const tmpList = [...ownerList];

                const newTempList = tmpList.sort((a, b) => {
                    if (a.nameOwner.toLowerCase() < b.nameOwner.toLowerCase()) {
                        return 1;
                    }

                    if (a.nameOwner.toLowerCase() > b.nameOwner.toLowerCase()) {
                        return -1;
                    }
                    
                    return 0;
                });

                setOwnerList(newTempList);

            }
            else{

                setLoading(true);

                fetch("/owners/descendent", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                }).then(res => res.json()).then(data => {
        
                    setOwnerList(data);
        
                    setLoading(false);
        
                }).catch(err => console.log(err));
            }
            
        }
        else{
            
            setSortType("asc");

            if (filterType === "Pets") {
                
                const tmpList = [...ownerList];

                const newTempList = tmpList.sort((a, b) => {
                    if (a.nameOwner.toLowerCase() < b.nameOwner.toLowerCase()) {
                        return -1;
                    }

                    if (a.nameOwner.toLowerCase() > b.nameOwner.toLowerCase()) {
                        return 1;
                    }
                    
                    return 0;
                });

                setOwnerList(newTempList);

            }
            else{

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
            }

        }


    }

    return (
        
        <section className={styles.list}>
            <ul className={styles.categories}>

                <li title={sortType === "asc" ? "descendent" : "ascendent"}> <button onClick={ () => sortByName() }>Name <img className={styles.arrow} style={{transform: sortType === "asc" ? "rotateZ(90deg)" : "rotateZ(270deg)"}} src={Arrow} alt="sort" /> </button></li>

                {categories.map((elm, index) => {

                    return (
                        <li key={index}>{elm}</li>
                    )
                })}
            </ul>
            {loading ? <Skeleton height={41} backgroundColor={"#CDF0EA"} number={3} width={90}/> :
            
            <ul className={styles.owner}>

                {ownerList.map((elm, index) => {

                    const obj = [{"id": elm.id, "telephones": elm.telephones, "address": elm.address, "nameOwner": elm.nameOwner, "email": elm.email, "registered": elm.registerDate}];

                    return (
                        <li key={elm.id} className={styles.item}>
                            {/* <div className="checkbox">
                                <input type="checkbox" onChange={() => console.log("si")}/>
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