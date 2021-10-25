import React, { useState, useRef } from "react";
import PropTypes from 'prop-types'

import { btnContainer, btnEdit, list_container, input } from "../../styles/modules/btn.module.scss";

/**
 * 
 * Dropdown component. 
 * 
 * Specify search as true to use the search box. It also needs an event handler for the onChange event.
 * 
 * Example: const eventHandler = (e) => {}, function eventHandler (e) {}
 *  
 */

const GenericDropdown = ({ id, title, center = false, search = false, event, ...props }) => {
    
    const [showOptions, setShowOptions] = useState(false);

    const refInput = useRef(null);

    const getOptions = (e) => {

        if (search) {
            setShowOptions(true);

            if (!e.target.isEqualNode(refInput.current) && showOptions) {
                setShowOptions(false);
            }
        }
        else{
            if (showOptions) {
                setShowOptions(false);
            }
            else{
                setShowOptions(true);
            }
        }
        
    };

    const hideOptions = (e) => {
        
        if (search) {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                
                setShowOptions(false);
            }
            else if (e.currentTarget.contains(refInput.current)){
                
                setShowOptions(true);
            }
        }
        else{
            if (!e.currentTarget.contains(e.relatedTarget)) {
                
                setShowOptions(false);
            }
            else {
                
                setShowOptions(true);
            }
        }
        
    };

    return (
        <div onClick={(e) => getOptions(e)} onBlur={(e) => hideOptions(e)} className={btnContainer} center={center.toString()}>
            <button type="button" className={btnEdit} btndropdown={showOptions.toString()}>
                {title}
            </button>
            
            { showOptions && 
                
                <div className={list_container}>
                    {search && <input type="text" className={input} ref={refInput} placeholder="search by name" onChange={e => event(e.currentTarget.value)}/>}
                    {props.children}
                </div>

            }
        </div>
    );
};

GenericDropdown.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    data: PropTypes.array,
    event: PropTypes.func
};

export default GenericDropdown;