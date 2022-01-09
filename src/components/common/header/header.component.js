import React from 'react';
import './header.component.css'
import { Link, withRouter } from 'react-router-dom';

const logout = (history) => {
    localStorage.clear();
    history.push('/');
}
const HeaderComponent = (props) => {
    // props is incoming data
    let content = props.isLoggedIn
        ? <ul className="nav_list">
            <li className="nav_item">
                <Link to="/dashboard">Dashboard</Link>

            </li>
            <li className="nav_item">
                <Link to="/profile">Profile</Link>

            </li>
            <li className="nav_item">
                <button className="btn btn-success logout" onClick={() => logout(props.history)}>Logout</button>

            </li>
        </ul>
        : <ul className="nav_list">
            <li className="nav_item">
                <Link to="/">Login</Link>
            </li>
            <li className="nav_item">
                <Link to="/home">Home</Link>
            </li>
            <li className="nav_item">
                <Link to="/about">About</Link>
            </li>
            <li className="nav_item">
                <Link to="/contacts">Contact</Link>
            </li>
        </ul>
    return content
}

export const Header = withRouter(HeaderComponent);


// form_validation
// web_storage==> localstorage, sessionstorage
// toastr ==> configuration, scope maintain(Scalable)
// error handling service==> 
// withRouter ==> wrapper that will provide the props to component
// authentication

// client - server communication
// protocol
// smtp
// ftp
// http

// web === http, web-server === http-server, web client === http client

// protocol 
// http verb(method)
// http statuscode
// REST 