import React, {useState} from "react";

import Header from "./header";
import OwnerControl from "./owner_controls";
import OwnerList from "./owner_list";
import AddOwner from "./add_owner";

import styles from "../../styles/owner/owner.module.scss";

const OwnerMessage = ({ setOwnerMessage }) => {

    return (
        <div className={styles.message} onAnimationEnd={() => setOwnerMessage(false)}>
            <span>Owner added</span>
        </div>
    );
};

const Owner = () => {
    
    const [numberOwners, setNumberOwners] = useState(null);

    const [addNewOwner, setAddNewOwner] = useState(false);

    const [ownerMessage, setOwnerMessage] = useState(false);

    const [ownerList, setOwnerList] = useState([]);

    const [tempList, setTempList] = useState(ownerList);
    
    return (
        <div className={styles.container}>
            <Header />
            <OwnerControl setAddNewOwner={setAddNewOwner} numberOwners={numberOwners} setOwnerList={setOwnerList} tempList={tempList}/>
            <OwnerList setNumberOwners={setNumberOwners} setOwnerList={setOwnerList} ownerList={ownerList} setTempList={setTempList}/>
            {addNewOwner && <AddOwner setAddNewOwner={setAddNewOwner} setOwnerMessage={setOwnerMessage} setOwnerList={setOwnerList} ownerList={ownerList}/>}
            {ownerMessage && <OwnerMessage setOwnerMessage={setOwnerMessage} />}
        </div>
    );
}

export default Owner;