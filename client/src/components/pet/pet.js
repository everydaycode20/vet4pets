

import Header from "./header";
import PetControl from "./pet_control";
import PetList from "./pet_list";

import "../../styles/pet/pet.scss";

const Pet = () => {
    
    return (
        <div className="main-pet-container">
            <Header />
            <PetControl />
            <PetList />
        </div>
    );
}

export default Pet;