import React, { useState, createContext } from "react";

const AuthContext = createContext();

const ProvideAuth = ( { children } ) => {

    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={{ auth }}>
            {children}
        </AuthContext.Provider>
    );

};

const useProvideAuth = () => {
    
    const [user, setUser] = useState(null);

    const [authorized, setAuthorized] = useState(null);

    const [errorLogin, setErrorLogin] = useState(false);

    const login = ( username, password ) => {
        setAuthorized(null);
        fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })

        }).then(res => res.json()).then(data => {
            
            if (!data.status) {
                setAuthorized(false);
                setErrorLogin(true);
            }

            setUser(data.user);
            setAuthorized(data.status);
        });

    };

    const checkAuth = () => {

        fetch("/check", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(data => {
            setUser(data.user);
            setAuthorized(data.status);

        });

    }

    const logout = () => {

        fetch("/logout", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(data => {
            
            setAuthorized(data.status);

        });

    };

    return {
        user,
        login,
        authorized,
        checkAuth,
        logout,
        errorLogin
    }
};


export { ProvideAuth, AuthContext };