import React, { useState } from "react";

import styles from "../../styles/register/register.module.scss";

const Register = () => {

    const [user, setUser] = useState("");

    const [name, setName] = useState("")

    const [lastName, setLastName] = useState("")

    const [password, setPassword] = useState("")

    const [email, setEmail] = useState("");

    const register = e => {

        e.preventDefault();

        fetch("/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user, name, lastName, email, password })
        }).then(res => res.json()).then(data => {
            
        });

    }

    return (
        <div className={styles.container}>

            <form className={styles.form} onSubmit={e => register(e)}>
                
                <h1>Create a new account</h1>
                
                <div>
                    <label htmlFor="user">username</label>
                    <input type="text" id="user" name="user" onChange={e => setUser(e.target.value)} />
                </div>

                <div className={styles.personal}>
                    <div>
                        <label htmlFor="name">name</label>
                        <input type="text" id="name" name="name" onChange={e => setName(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="last">last name</label>
                        <input type="text" id="last" name="last" onChange={e => setLastName(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" id="email" name="email" onChange={e => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
                </div>

                <button>Register</button>

            </form>

        </div>
    );
};

export default Register;