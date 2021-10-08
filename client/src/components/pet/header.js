import React from "react";

import { header, title} from "../../styles/pet/pet.module.scss";

const Header = () => {
    
    return (
        <header className={header}>
            <div className={title}>
                <h1>Pets</h1>
            </div>
    </header>
    );
};

export default Header;