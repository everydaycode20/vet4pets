import React, { useState } from "react";

import ArrowLeft from "../../assets/arrow_left_.svg";

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
        <div onClick={() => getTelephoneList(elm.id)} onBlur={(e) => hideOptions(e)}>
            {elm.telephones.length > 1 ? 
                <button  rot={showListTelephones && indexTel === elm.id ? showListTelephones.toString() : false.toString()}>{elm.telephones.length} phones <img src={ArrowLeft} alt="more" /> </button> :
                <span>{elm.telephones[0]}</span>
            }
            {showListTelephones && indexTel === elm.id && <ul className="tel-list">
                {elm.telephones.map((item, index) => {

                    return <li key={index}>{item}</li>
                })}
            </ul>}
        </div>
    );
};

export default TelBtn;