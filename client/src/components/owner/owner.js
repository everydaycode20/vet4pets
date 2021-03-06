import React, {useState} from "react";

import Header from "./header";
import OwnerControl from "./owner_controls";
import OwnerList from "./owner_list";
import AddOwner from "./add_owner";

import usePage from "../../utils/usePage";

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
    
    const [filterType, setFilterType] = useState("All");

    const [view, setView] = useState("list");

    usePage("owners");

    return (
        <div className={styles.container}>

            <Header />

            <OwnerControl setAddNewOwner={setAddNewOwner} numberOwners={numberOwners} setOwnerList={setOwnerList} tempList={tempList} filterType={filterType} setFilterType={setFilterType} setView={setView} view={view} />

            <OwnerList setNumberOwners={setNumberOwners} setOwnerList={setOwnerList} ownerList={ownerList} setTempList={setTempList} filterType={filterType} view={view} />

            {addNewOwner && <AddOwner setAddNewOwner={setAddNewOwner} setOwnerMessage={setOwnerMessage} setOwnerList={setOwnerList} ownerList={ownerList} />}

            {ownerMessage && <OwnerMessage setOwnerMessage={setOwnerMessage} />}

        </div>
    );
}

export default Owner;