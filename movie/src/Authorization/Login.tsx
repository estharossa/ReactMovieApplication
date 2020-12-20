import React, {ReactElement, useContext, useState} from 'react'
import {Redirect} from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import css from './Register.module.css'

interface Props {
    login: (username: string, password: string) => void
}

export default function Login({login}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authState = useContext(AuthContext)

    function authorize() {
        login(username, password)
    }

    return (
        <div className={css.input_container}>
            <div className={css.input_card}>
                <h1>Login</h1>
                <input type='text' placeholder='Username...' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => authorize()}>Login</button>
                {authState.isLogged ? <Redirect to='/account'/> : null}
            </div>
        </div>
    );
}