import React, { useState } from "react";

import Arrow from "../../assets/arrow_left_.svg";

import styles from "../../styles/pet/pet.module.scss";

const Categories = ( { setPetList, setLoading } ) => {
    
    const categories = ["Owner Name", "Age", "Type"];

    const [sortType, setSortType] = useState("asc");

    const [dateSortType, setDateSortType] = useState("asc");

    const sortByName = () => {

        if (sortType === "asc") {
            
            setSortType("desc");

            setLoading(true);

            fetch("/pets/descendent", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json()).then(data => {
    
                setPetList(data);
    
                setLoading(false);
    
            }).catch(err => console.log(err));

        }
        else{

            setSortType("asc");

            setLoading(true);

            fetch("/pets", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            }).then(res => res.json()).then(data => {
                
                setPetList(data);

                setLoading(false);
    
            }).catch(err => console.log(err));

        }

    };

    const sortByDate = () => {

        if (dateSortType === "asc") {
            
            setDateSortType("desc");

            setLoading(true);

            fetch("/pets/date_desc", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json()).then(data => {
    
                setPetList(data);
    
                setLoading(false);
    
            }).catch(err => console.log(err));

        }
        else{

            setDateSortType("asc");

            setLoading(true);

            fetch("/pets/date_asc", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            }).then(res => res.json()).then(data => {
                
                setPetList(data);

                setLoading(false);
    
            }).catch(err => console.log(err));

        }

    };

    return (
        <ul className={styles.categories}>

            <li title={sortType === "asc" ? "descendent" : "ascendent"}> <button onClick={ () => sortByName() }>Name <img className={styles.arrow} style={{transform: sortType ===  "asc" ? "rotateZ(90deg)" : "rotateZ(270deg)"}} src={Arrow} alt="sort" /> </button></li>

            {categories.map((elm, index) => {

                return (
                    <li key={index}>{elm}</li>
                )
            })}

            <li title={dateSortType === "asc" ? "descendent" : "ascendent"}> <button onClick={ () => sortByDate() }>Register Date <img className={styles.arrow} style={{transform: dateSortType === "asc" ? "rotateZ(90deg)" : "rotateZ(270deg)"}} src={Arrow} alt="sort" /> </button></li>

        </ul>
    );

};

export default Categories;