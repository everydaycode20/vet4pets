import React from "react";

import { control } from "../../styles/pet/pet.module.scss";

const PetControl = ({ numberPets, setAddPet }) => {

    return (
        <div className={control}>
            <span>{numberPets} pets</span>
            <button onClick={() => setAddPet(true)}>Add new pet</button>
        </div>
    );
};

export default PetControl;