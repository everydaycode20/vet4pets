import React, {useState} from "react";

import Header from "./header";
import OwnerControl from "./owner_controls";
import OwnerList from "./owner_list";

import "../../styles/owner/owner.scss";

const Owner = () => {
    
    const [numberOwners, setNumberOwners] = useState(null);

    return (
        <div className="main-owner-container">
            <Header />
            <OwnerControl numberOwners={numberOwners}/>
            <OwnerList setNumberOwners={setNumberOwners}/>
        </div>
    );
}

export default Owner;