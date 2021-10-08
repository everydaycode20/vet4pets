import React, { useState } from "react";

import Header from "./header";
import PetControl from "./pet_control";
import PetList from "./pet_list";
import AddPet from "./add_pet";

import styles from "../../styles/pet/pet.module.scss";

const PetMessage = ({ setPetMessage }) => {

    return (
        <div className={styles.message} onAnimationEnd={() => setPetMessage(false)}>
            <span>Owner added</span>
        </div>
    );
};

const Pet = () => {
    
    const [numberPets, setNumberPets] = useState(null);

    const [addPet, setAddPet] = useState(false);

    const [petMessage, setPetMessage] = useState(false);

    return (
        <div className={styles.main_container}>
            <Header />
            <PetControl numberPets={numberPets} setAddPet={setAddPet}/>
            <PetList setNumberPets={setNumberPets}/>
            {addPet && <AddPet setAddPet={setAddPet} setPetMessage={setPetMessage}/>}
            {petMessage && <PetMessage setPetMessage={setPetMessage}/>}
        </div>
    );
}

export default Pet;