import React, { ReactElement, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import User from '../Model/User';
import css from './Register.module.css'

interface Props{
    lastIndex: number,
    register: (user: User) => void
}

export default function Register({lastIndex, register}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authState = useContext(AuthContext)

    function createUser(): User {
        let user: User = {id: lastIndex, username: username, password: password, favourites: []}
        return user 
    }

    return (
        <div>
            <div className={css.input_container}>
                Register
                <input type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)}></input>
                <input type='text' placeholder='password'onChange={(e)=>setPassword(e.target.value)}></input>
                <button onClick={() => register(createUser())}>Register</button>
                {authState.isLogged ? <Redirect to='/account' /> : null}
            </div>
        </div>
    )
}