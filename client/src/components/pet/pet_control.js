import React, { memo } from "react";

import { control } from "../../styles/pet/pet.module.scss";

const PetControl = memo(({ numberPets, setAddPet }) => {

    return (
        <div className={control}>

            <span>{numberPets} pets</span>

            <button onClick={() => setAddPet(true)}>Add new pet</button>

        </div>
    );
});

export default PetControl;