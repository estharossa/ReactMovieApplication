import React, { useContext,useReducer } from 'react'
import { Redirect } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import './Account.css'

interface Props {
    logout: () => void
}

export default function Account({ logout }: Props) {
    const authState = useContext(AuthContext)
    console.log(authState.user)
    return (
        <div className='account-container'>
            <h2>Current state: {authState.isLogged && 'authorized'}</h2>
            <h2>Usename: {authState.user?.username}</h2>
            <h2>Password: {authState.user?.password}</h2>
            <button onClick={logout}>Logout</button>
            {!authState.isLogged ? <Redirect to='/' /> : null} 
        </div>
    )
}
