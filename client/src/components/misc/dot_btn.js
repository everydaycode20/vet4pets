import React, { useState } from "react";

import styles from "../../styles/modules/dot_dropdown.module.scss";

const DotBtn = ({ id, rotate = false, ...props }) => {

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
        <div onClick={() => getOptions(id)} onBlur={(e) => hideOptions(e)} className={styles.container} data-testid="dropdown">
            <button className={styles.dot_container} style={{transform: rotate && "rotateZ(90deg)", }}>
                <div className={styles.dot}/>
                <div className={styles.dot}/>
                <div className={styles.dot}/>
            </button>
            { showOptions === id && <React.Fragment>{props.children}</React.Fragment> }
        </div>
    );
};

export default DotBtn;