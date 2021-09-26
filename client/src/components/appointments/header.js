import React, { memo } from "react";

const Header = memo(() => {

    return (
        <header className="header">
        <div className="control-container">
            <h1>Appointments</h1>
            {/* <div className="control-view">
                <button>yearly</button>
                <button>monthly</button>
                <button>weekly</button>
            </div> */}
        </div>
        
    </header>
    );
});

export default Header;