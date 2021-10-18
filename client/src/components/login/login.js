import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import styles from "../../styles/login/login.module.scss";
import { AuthContext } from "../../utils/useAuth";

const Login = () => {

    const { auth } = useContext(AuthContext);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const login = e => {

        e.preventDefault();

        auth.login(username, password);
        
    };

    if (auth.authorized) {
        
        return <Redirect to="/"/>
    }

    return (
        <div className={styles.container}>

            {auth.authorized === false && 
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
};

export default Login;