import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Profile from "../../assets/profile_filled_black.svg";
import DotBtn from "../misc/dot_btn";
import TelBtn from "../misc/tel_btn";

import Skeleton from "../misc/skeleton";
import AddressDropdown from "../misc/address_dropdown";
import Categories from "./owner_list_categories";

import styles from "../../styles/owner/owner_list.module.scss";

const OwnerList = memo(({ setNumberOwners, setOwnerList, ownerList, setTempList, filterType, view }) => {

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

            setTempList(data);

            setNumberOwners(data.length);
            setLoading(false);

        }).catch(err => console.log(err));

    }, []);

    const style = {
        "display": "grid",
        "gridTemplateColumns": "repeat(auto-fit, minmax( 15rem, 1fr))",
        "padding": "5px",
        "columnGap": "20px"
    }

    return (
        
        <section className={styles.list}>

            <Categories filterType={filterType} ownerList={ownerList} setOwnerList={setOwnerList} setLoading={setLoading} setTempList={setTempList} />

            {loading ? <Skeleton height={41} backgroundColor={"#CDF0EA"} number={3} width={90}/> :
            
            <ul className={styles.owner} style={view === "grid" ? style : {}}>

                {ownerList.map((elm, index) => {

                    const obj = [{"id": elm.id, "telephones": elm.telephones, "address": elm.address, "nameOwner": elm.nameOwner, "email": elm.email, "registered": elm.registerDate}];

                    return (
                        <li key={elm.id} className={styles.item} style={{height: view === "grid" && "100%", marginBottom: view === "grid" && "0"}}>
                            {/* <div className="checkbox">
                                <input type="checkbox" onChange={() => console.log("test")}/>
                            </div> */}
                            <span>{elm.nameOwner}</span>
                            <span style={{whiteSpace: view === "grid" && "break-spaces", wordWrap: view === "grid" && "anywhere"}}>{elm.email}</span>
                            
                            <TelBtn elm={elm}/>
                            
                            <AddressDropdown address={elm.address} id={elm.id}/>

                            <span>{elm.registerDate}</span>

                            <DotBtn id={elm.id} top={view === "grid" && 3}>
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