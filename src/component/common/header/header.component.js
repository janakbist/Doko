import React from "react";
import  './header.component.css';
export const Header = (props) => {
    let Content = props.isLoggedIn
    ?<ul className="nav_list"> 
    <li className="nav_item">Home</li>
    < li className="nav_item">Profile</li>
    <li className="nav_item">Logout</li>           
</ul>
:<ul className="nav_list">
    <li className="nav_item">Home</li> 
    <li className="nav_item">Login</li> 
    <li className="nav_item">Register</li> 
</ul>
    return(
        <div className="nav_bar">
            {Content}
        </div>
    )
}