import React from "react";

import { control } from "../../styles/owner/owner.module.scss";

const OwnerControl = ({ setAddNewOwner, numberOwners }) => {

    return (
        <div className={control}>
            <span>{numberOwners} owners</span>
            <button onClick={() => setAddNewOwner(true)}>Add new owner</button>
        </div>
    );
};

export default OwnerControl;