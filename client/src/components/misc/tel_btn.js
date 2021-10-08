import React, { useState } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

import { tel_dropdown, tel_list, btn } from "../../styles/owner/owner_list.module.scss";

const TelBtn = ({ elm }) => {

    const [showListTelephones, setShowListTelephones] = useState(false);

    const [indexTel, setIndexTel] = useState(null);

    const getTelephoneList = (index) => {
        
        if (elm.telephones.length > 1) {
            setShowListTelephones(true);

            setIndexTel(index);
        }
        
        
        if (showListTelephones ) {
            setShowListTelephones(false);
            setIndexTel(null);
        }
    };

    const hideOptions = (e) => {

        if (!e.currentTarget.contains(e.relatedTarget) && elm.telephones.length > 1) {
            setShowListTelephones(false);
            setIndexTel(null);
        }
        
    };

    return (
        <div className={tel_dropdown} onClick={() => getTelephoneList(elm.id)} onBlur={(e) => hideOptions(e)}>
            {elm.telephones.length > 1 ? 
                <button className={btn} rot={showListTelephones && indexTel === elm.id ? showListTelephones.toString() : false.toString()}>{elm.telephones.length} phones <img src={ArrowLeft} alt="more" /> </button> :
                <span>{elm.telephones[0]}</span>
            }
            {showListTelephones && indexTel === elm.id && <ul className={tel_list}>
                {elm.telephones.map((item, index) => {

                    return <li key={index}>{item}</li>
                })}
            </ul>}
        </div>
    );
};

export default TelBtn;