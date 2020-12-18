import React, { ReactElement, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import css from './Login.module.css'

interface Props{
    login: (username: string, password: string) => void
}

export default function Login({ login }: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authState = useContext(AuthContext)

    function authorize() {
        login(username, password)
    }

    return(
        <div>
            <div className={css.input_container}>
                Login
                <input type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)}></input>
                <input type='text' placeholder='password'onChange={(e)=>setPassword(e.target.value)}></input>
                <button onClick={() => authorize()}>Login</button>
                {authState.isLogged == true ? <Redirect to='/account' /> : null}
            </div>
        </div>
    );
}