import React, { useState, memo } from "react";

import GenericDropdown from "../misc/generic_dropdown";

import styles, { control } from "../../styles/owner/owner.module.scss";

const OwnerControl = memo(({ setAddNewOwner, numberOwners, tempList, setOwnerList, filterType, setFilterType }) => {

    const filterByPet = () => {

        setFilterType("Pets");

        fetch("/owners/pet", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setOwnerList(data);

        }).catch(err => console.log(err));

    };

    const getAll = () => {

        setFilterType("All");

        setOwnerList(tempList);

    }

    return (
        <div className={control}>
            <span>{numberOwners} owners</span>

            <div className={styles.dropdown}>
                <GenericDropdown title={`Show: ${filterType}`}>
                    <ul className={styles.options}>
                        <li> <button style={{backgroundColor: filterType === "Pets" && "#CDF0EA"}} onClick={() => filterByPet()}>Only with pets</button> </li>
                        <li> <button style={{backgroundColor: filterType === "All" && "#CDF0EA"}} onClick={() => getAll()}>All</button> </li>
                    </ul>
                </GenericDropdown>
            </div>

            <button onClick={() => setAddNewOwner(true)}>Add new owner</button>
        </div>
    );
});

export default OwnerControl;