import React, { useState } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

import { address_content, address_dropdown, btn } from "../../styles/owner/owner_list.module.scss";

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
        <div className={address_dropdown} onClick={() => getAddress(id)} onBlur={(e) => hideOptions(e)}>
            
            <button className={btn} rot={showAddress && indexAddress === id ? showAddress.toString() : false.toString()}>{address.substring(0, 10) + "..."} <img src={ArrowLeft} alt="more"/></button>

            {showAddress && indexAddress === id && 
                <div className={address_content}>
                    <p>{address}</p>
                </div>
            }
        </div>
    );
};

export default AddressDropdown;