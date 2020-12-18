import React from 'react'
import AuthState from '../Model/AuthState'
import User from '../Model/User'

const AuthContext = React.createContext<AuthState>({isLogged: false})

export default AuthContext