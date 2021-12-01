import React, { memo } from "react";

import GridIcon from "../../assets/grid_layout_.svg";
import ListIcon from "../../assets/list_layout_.svg";

import styles, { control } from "../../styles/pet/pet.module.scss";

const PetControl = memo(({ numberPets, setAddPet, setView, view,  }) => {


    return (
        <div className={control}>

            <span>{numberPets} pets</span>

            <div className={styles.view}>
                <button title="list view" className={styles.btn} style={{backgroundColor: view === "list" && "#CDF0EA"}} onClick={() => setView("list")}><img src={ListIcon} alt="list"/></button>
                <button title="grid view" className={styles.btn} style={{backgroundColor: view === "grid" && "#CDF0EA"}} onClick={() => setView("grid")}><img src={GridIcon} alt="grid"/></button>
            </div>

            <button onClick={() => setAddPet(true)}>Add new pet</button>

        </div>
    );
});

export default PetControl;