import React, { useState } from "react";

import Arrow from "../../assets/arrow_left_.svg";

import styles from "../../styles/owner/owner_list.module.scss";

const Categories = ( { setLoading, ownerList, filterType, setOwnerList, setTempList } ) => {

    const categories = ["Email", "Phone Number", "Address"];
    
    const [sortType, setSortType] = useState("asc");

    const [dateSortType, setDateSortType] = useState("asc");

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

                    setLoading(false);
        
                }).catch(err => console.log(err));
            }

        }


    }
    
    const sortByDate = () => {

        if (dateSortType === "asc") {

            setDateSortType("desc");

            if (filterType === "Pets") {

                const tmpList = [...ownerList];

                const newTempList = tmpList.sort((a, b) => {
                    if (new Date(a.registerDate) < new Date(b.registerDate)) {
                        return 1;
                    }

                    if (new Date(a.registerDate) > new Date(b.registerDate)) {
                        return -1;
                    }
                    
                    return 0;
                });

                setOwnerList(newTempList);

            }
            else{

                setLoading(true);

                fetch("/owners/date_desc", {
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
            
            setDateSortType("asc");

            if (filterType === "Pets") {
                
                const tmpList = [...ownerList];

                const newTempList = tmpList.sort((a, b) => {
                    if (new Date(a.registerDate) < new Date(b.registerDate)) {
                        return -1;
                    }

                    if (new Date(a.registerDate) > new Date(b.registerDate)) {
                        return 1;
                    }
                    
                    return 0;
                });

                setOwnerList(newTempList);

            }
            else{

                setLoading(true);

                fetch("/owners/date_asc", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                }).then(res => res.json()).then(data => {
                    
                    setOwnerList(data);
        
                    setTempList(data);
        
                    setLoading(false);
        
                }).catch(err => console.log(err));
            }

        }

    };

    return (
        <ul className={styles.categories}>

            <li title={sortType === "asc" ? "descendent" : "ascendent"}> <button onClick={ () => sortByName() }>Name <img className={styles.arrow} style={{transform: sortType === "asc" ? "rotateZ(90deg)" : "rotateZ(270deg)"}} src={Arrow} alt="sort" /> </button></li>

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