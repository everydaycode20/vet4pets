import React, { useState } from "react";

import Header from "./header";
import PetControl from "./pet_control";
import PetList from "./pet_list";
import AddPet from "./add_pet";

import usePage from "../../utils/usePage";

import styles from "../../styles/pet/pet.module.scss";

const PetMessage = ({ setPetMessage }) => {

    return (
        <div className={styles.message} onAnimationEnd={() => setPetMessage(false)}>
            <span>Pet added</span>
        </div>
    );
};

const Pet = () => {
    
    const [numberPets, setNumberPets] = useState(null);

    const [addPet, setAddPet] = useState(false);

    const [petMessage, setPetMessage] = useState(false);

    const [petList, setPetList] = useState([]);

    const [view, setView] = useState("list");

    usePage("pets");

    return (
        <div className={styles.main_container}>

            <Header />

            <PetControl numberPets={numberPets} setAddPet={setAddPet} petList={petList} setPetList={setPetList} setView={setView} view={view}/>

            <PetList setNumberPets={setNumberPets} setPetList={setPetList} petList={petList} view={view} />

            {addPet && <AddPet setAddPet={setAddPet} setPetMessage={setPetMessage} setPetList={setPetList} petList={petList} />}

            {petMessage && <PetMessage setPetMessage={setPetMessage}/>}
            
        </div>
    );
}

export default Pet;