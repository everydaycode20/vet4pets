import React, { useState } from "react";
import PropTypes from 'prop-types'

const GenericDropdown = ({ id, title, ...props }) => {

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
        <div onClick={() => getOptions()} onBlur={(e) => hideOptions(e)} style={{width: "max-content", position: "relative"}}>
            <button type="button" className="dropdown-container" btndropdown={showOptions.toString()}>
                {title}
            </button>
            { showOptions && <React.Fragment>{props.children}</React.Fragment> }
        </div>
    );
};

GenericDropdown.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string
};

export default GenericDropdown;