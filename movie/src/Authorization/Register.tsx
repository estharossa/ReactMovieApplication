import React, { ReactElement, useContext, useState} from 'react'
import {Redirect} from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import User from '../Model/User';
import css from './Register.module.css'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface Props {
    lastIndex: number,
    register: (user: User) => void
}

export default function Register({lastIndex, register}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')

    const authState = useContext(AuthContext)

    function createUser(): User {
        console.log("Username: " + username)
        console.log("Password: " + password)
        return {id: lastIndex, username: username, password: password, favourites: []}
    }

    function validate() {
        if (username.length == 0 || password.length == 0 && email.length == 0) {
            alert("There are some missing fields.")
            return
        }
        register(createUser())
    }

    return (
        <div className={css.input_container}>
            <div className={css.input_card}>
                <h1>Registration</h1>
                <input type='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
                <input type='text' placeholder='Username...' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => validate()}>Register</button>
                {authState.isLogged ? <Redirect to='/account'/> : null}
            </div>
        </div>
    )
}