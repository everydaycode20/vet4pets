import React, { useState } from "react";

const GenericDropdown = ({ id, ...props }) => {

    const [showOptions, setShowOptions] = useState(false);

    const getOptions = () => {
        
        if (showOptions) {
            setShowOptions(false);
        }
        else{
            setShowOptions(true);
        }
    };

    const hideOptions = (e) => {

        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowOptions(false);
        }
        
    };

    return (
        <div onClick={() => getOptions()} onBlur={(e) => hideOptions(e)} style={{width: "max-content"}}>
            <button type="button" className="dropdown-container" btndropdown={showOptions.toString()}>
                {props.title}
            </button>
            { showOptions && <React.Fragment>{props.children}</React.Fragment> }
        </div>
    );
};

export default GenericDropdown;