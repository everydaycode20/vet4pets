import React, { useState } from "react";

import Header from "./header";
import PetControl from "./pet_control";
import PetList from "./pet_list";

import "../../styles/pet/pet.scss";

const Pet = () => {
    
    const [numberPets, setNumberPets] = useState(null);

    return (
        <div className="main-pet-container">
            <Header />
            <PetControl numberPets={numberPets}/>
            <PetList setNumberPets={setNumberPets}/>
        </div>
    );
}

export default Pet;