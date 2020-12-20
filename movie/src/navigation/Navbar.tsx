import React, {ReactElement, useContext} from "react";
import {Link} from 'react-router-dom'
import AuthContext from "../Context/AuthContext";
import './Navbar.css'

interface Props {
}

export default function NavBar({}: Props): ReactElement {
    const authState = useContext(AuthContext)

    return (
        <div className="nav-bar">
            <ul>
                <Link to="/">
                    <li>Movies</li>
                </Link>
                {authState.isLogged ?
                    <Link to='/favourites'>
                        <li>Favourites</li>
                    </Link>
                    : null}
                {authState.isLogged ?
                    <Link to='/account'>
                        <li>Account</li>
                    </Link>
                    : null}
                {authState.isLogged ? null :
                    <Link to="/login">
                        <li>Login</li>
                    </Link>
                }
                {authState.isLogged ? null :
                    <Link to="/register">
                        <li>Register</li>
                    </Link>
                }
            </ul>
        </div>
    );
}
