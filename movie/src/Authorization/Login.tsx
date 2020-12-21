import React, {ReactElement, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';
import css from './Register.module.css'
import {useDispatch, useSelector} from "react-redux";
import AuthState from "../Model/AuthState";
import User from "../Model/User";
import instance from "../db/axios";
import {AuthAction} from "../Model/AuthAction.enum";

interface Props {

}

const API_USERS = '/people'

export default function Login({}: Props): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<User[]>([])
    const authState = useSelector<AuthState>((state: AuthState) => state) as AuthState
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchUsers() {
            const result = await instance.get(API_USERS)
            setUsers([...result.data])
        }

        fetchUsers()
    }, [])

    function authenticateUser() {
        const isPresent = users.find((user) => user.username === username && user.password === password) != null
        const user = users.find((user) => user.username === username && user.password === password)
        if (isPresent) {
            dispatch({type: AuthAction.LOGIN, user: user})
        } else {
            dispatch({type: AuthAction.LOGIN})
        }
    }

    return (
        <div className={css.input_container}>
            <div className={css.input_card}>
                <h1>Login</h1>
                <input type='text' placeholder='Username...' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={authenticateUser}>Login</button>
                {authState.isLogged ? <Redirect to='/account'/> : null}
            </div>
        </div>
    );
}