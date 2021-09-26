import React, {useState} from "react";
import { Link, Switch, Router, Route } from "react-router-dom";

import Header from "./header";
import OwnerControl from "./owner_controls";
import OwnerList from "./owner_list";
import AddOwner from "./add_owner";
import OwnerProfile from "../owner_profile/owner_profile";

import "../../styles/owner/owner.scss";

const OwnerMessage = ({ setOwnerMessage }) => {

    return (
        <div className="owner-message" onAnimationEnd={() => setOwnerMessage(false)}>
            <span>Owner added</span>
        </div>
    );
};

const Owner = () => {
    
    const [numberOwners, setNumberOwners] = useState(null);

    const [addNewOwner, setAddNewOwner] = useState(false);

    const [ownerMessage, setOwnerMessage] = useState(false);

    const [ownerList, setOwnerList] = useState([]);

    return (
        <div className="main-owner-container">
            <Header />
            <OwnerControl setAddNewOwner={setAddNewOwner} numberOwners={numberOwners}/>
            <OwnerList setNumberOwners={setNumberOwners} setOwnerList={setOwnerList} ownerList={ownerList}/>
            {addNewOwner && <AddOwner setAddNewOwner={setAddNewOwner} setOwnerMessage={setOwnerMessage} setOwnerList={setOwnerList} ownerList={ownerList}/>}
            {ownerMessage && <OwnerMessage setOwnerMessage={setOwnerMessage} />}
            <Switch>
            <Route path="/owners/:id">
                <OwnerProfile />
            </Route>
        </Switch>
        </div>
    );
}

export default Owner;