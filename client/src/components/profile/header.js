import React from "react";

import { header, title} from "../../styles/profile/profile.module.scss";

const Header = () => {
    
    return (
        <header className={header}>
            <div className={title}>
                <h1>Profile</h1>
            </div>
    </header>
    );
};

export default Header;