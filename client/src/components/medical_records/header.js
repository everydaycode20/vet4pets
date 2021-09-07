import React, { memo } from "react";

const Header = memo(() => {

    return (
        <header className="header">
            <div className="medical-records-header">
                <h1>Medical Records</h1>
            </div>
            <div className="notifications">bell</div>
        </header>
    );
});

export default Header;