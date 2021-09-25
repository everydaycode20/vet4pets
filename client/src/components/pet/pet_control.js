import React from "react";

const PetControl = ({ numberPets, setAddPet }) => {

    return (
        <div className="pet-control">
            <span>{numberPets} pets</span>
            <button onClick={() => setAddPet(true)}>Add new pet</button>
        </div>
    );
};

export default PetControl;