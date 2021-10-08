import React, { memo } from "react";

import { header, control} from "../../styles/settings/settings.module.scss";

const Header = memo(() => {

    return (
        <header className={header}>
            <div className={control}>
                <h1>Settings</h1>
            </div>
        
    </header>
    );
});

export default Header;