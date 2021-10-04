import React, { useState } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

const AddressDropdown = ({ id, address }) => {

    const [showAddress, setShowAddress] = useState(false);

    const [indexAddress, setIndexAddress] = useState(null);

    const getAddress = (index) => {
        
        
        
        if (showAddress) {
            setShowAddress(false);
            setIndexAddress(null);
        }
        else{
            setShowAddress(true);
            setIndexAddress(index);
        }
    };

    const hideOptions = (e) => {

        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowAddress(false);
            setIndexAddress(null);
        }
        
    };

    return (
        <div className="address-dropdown" onClick={() => getAddress(id)} onBlur={(e) => hideOptions(e)}>
            
            <span>{address.substring(0, 10) + "..."}</span>
            <button rot={showAddress && indexAddress === id ? showAddress.toString() : false.toString()}><img src={ArrowLeft} alt="more" /></button>

            {showAddress && indexAddress === id && 
                <div className="address-content">
                    {address}
                </div>
            }
        </div>
    );
};

export default AddressDropdown;