import React, { useState } from "react";

const DotBtn = ({ id, ...props }) => {

    const [showOptions, setShowOptions] = useState(null);

    const getOptions = (index) => {
        
        if (showOptions) {
            setShowOptions(null);
        }
        else{
            setShowOptions(index);
        }
    };

    const hideOptions = (e) => {

        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowOptions(null);
        }
        
    };

    return (
        <div onClick={() => getOptions(id)} onBlur={(e) => hideOptions(e)} className="main-dot-container">
            <button className="dot-container" >
                <div className="dot"/>
                <div className="dot"/>
                <div className="dot"/>
            </button>
            { showOptions === id && <React.Fragment>{props.children}</React.Fragment> }
        </div>
    );
};

export default DotBtn;