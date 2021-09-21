import React from "react";

const PetControl = ({ numberPets }) => {

    return (
        <div className="pet-control">
            <span>{numberPets} pets</span>
            <button>Add new pet</button>
        </div>
    );
};

export default PetControl;