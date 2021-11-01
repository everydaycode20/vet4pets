import React, { memo } from "react";

import { header, title } from "../../styles/owner/owner.module.scss";

const Header = memo(() => {

    return (
        <header className={header}>
            <div className={title}>
                <h1>Pet Owners</h1>
            </div>
    </header>
    );
});

export default Header;