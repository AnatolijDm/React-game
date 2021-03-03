import React, { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export const Navbar = ()  => {
    const history = useHistory()
    const auth = useContext(AuthContext);
    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    return(
        <nav>
            <div class="nav-wrapper">
            <a href="/" class="brand-logo">React-game</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><NavLink to="/start">Start game</NavLink></li>
                <li><NavLink to="/score">See score</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
            </div>
        </nav>
    )
}