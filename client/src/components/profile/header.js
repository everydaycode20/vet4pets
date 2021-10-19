import React, { useContext } from "react";

import { AuthContext } from "../../utils/useAuth";

import { header, title, logout} from "../../styles/profile/profile.module.scss";

const Header = () => {
    
    const { auth } = useContext(AuthContext);

    const signOut = () => {

        auth.logout();
    };

    return (
        <header className={header}>
            <div className={title}>
                <h1>Profile</h1>
                <button className={logout} onClick={() => signOut()}>logout</button>
            </div>
    </header>
    );
};

export default Header;