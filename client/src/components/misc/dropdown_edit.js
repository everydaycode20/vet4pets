import React, { useState } from "react";
import PropTypes from 'prop-types'

import { btnEdit, btnContainer} from "../../styles/modules/btn.module.scss";

const DropdownEdit = ({ id, title, defaultTitle, center = true, ...props }) => {
    
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
        <div className={btnContainer} onClick={() => getOptions()} onBlur={(e) => hideOptions(e)} center={center.toString()}>
            <button type="button" className={btnEdit} btndropdown={showOptions.toString()} >
                {title || defaultTitle}
            </button>
            { showOptions && <React.Fragment>{props.children}</React.Fragment> }
        </div>
    );
};

DropdownEdit.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    defaultTitle: PropTypes.string
};

export default DropdownEdit;