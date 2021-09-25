import React from "react";

const OwnerControl = ({ setAddNewOwner, numberOwners }) => {

    return (
        <div className="owner-control">
            <span>{numberOwners} owners</span>
            <button onClick={() => setAddNewOwner(true)}>Add new owner</button>
        </div>
    );
};

export default OwnerControl;