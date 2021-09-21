import React from "react";

const OwnerControl = ({ numberOwners }) => {

    return (
        <div className="owner-control">
            <span>{numberOwners} owners</span>
            <button>Add new owner</button>
        </div>
    );
};

export default OwnerControl;