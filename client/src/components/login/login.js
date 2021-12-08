import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import styles from "../../styles/login/login.module.scss";
import { AuthContext } from "../../utils/useAuth";

const Login = () => {

    const { auth } = useContext(AuthContext);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    useEffect(() => {
        
        auth.checkAuth();

    }, []);

    const login = e => {

        e.preventDefault();

        auth.login(username, password);
        
    };

    if (auth.authorized && auth.authorized !== null) {
        const page = sessionStorage.getItem('page');
        
        return <Redirect to={`${page ? page : "/"}`}/>
    }

    if (!auth.authorized && auth.authorized !== null) {
        
        return (
            <div className={styles.container}>

                {auth.errorLogin && 
                    <div className={styles.error} >
                        <span>Incorrect username or password</span>
                    </div>
                }

                <form className={styles.form} onSubmit={e => login(e)}>
                    
                    <h1>Login</h1>

                    <div>
                        <label htmlFor="username">username</label>
                        <input type="text" id="username" name="username" onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <button>login</button>

                    <Link to="/register">Register</Link>
                    
                </form>
                
            </div>
        );
    }

    return null;
};

export default Login;