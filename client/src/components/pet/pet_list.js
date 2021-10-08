import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Edit from "../../assets/edit_.svg";
import Pet from "../../assets/pet_filled_black.svg";
import DotBtn from "../misc/dot_btn";
import Skeleton from "../misc/skeleton";

import styles from "../../styles/pet/pet.module.scss";

const PetList = ( { setNumberPets }) => {

    const categories = ["Name", "Owner Name", "Age", "Type", "Register Date"];

    const [petList, setPetList] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/pets", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setPetList(data);

            setNumberPets(data.length);
            setLoading(false);
        }).catch(err => console.log(err));

    }, []);
    
    return (
        <section className={styles.list}>
            <ul className={styles.categories}>
                {categories.map((elm, index) => {

                    return (
                        <li key={index}>{elm}</li>
                    )
                })}
            </ul>
            {loading ? <Skeleton height={41} backgroundColor={"#CDF0EA"} number={3} width={90}/> :
            <ul className={styles.pet_list}>

                {petList.map((elm, index) => {

                    return (
                        <li key={elm.id} className={styles.item}>

                            {/* <div className={styles.checkbox}>
                                <input type="checkbox" />
                            </div> */}
                            
                            <span>{elm.namePet}</span>
                            <span>{elm.nameOwner}</span>
                            <span>{elm.age}</span>
                            <span>{elm.type}</span>
                            <span>{elm.registerDate}</span>
                            
                            {/* <DotBtn id={elm.id}>
                                <div className="owner-options" >
                                    <div className="pet-options">
                                        <Link to={{pathname: `/pets/${elm.id}`, state: "obj"}} > <img src={Pet} alt="profile" /> Owner profile</Link>
                                        <Link to={`/pets`}> <img src={Edit} alt="edit"/> Edit</Link>
                                    </div>
                                </div>
                            </DotBtn> */}

                        </li>
                    )
                })}
            </ul>
            }
        </section>
    );
};

export default PetList;