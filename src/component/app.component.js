import React  from 'react';
import { Login } from './Auth/login/login.component.js';
import {Header} from './common/header/header.component.js';

export const App = () => {
    return(
    <div>

        <Header isLoggedIn = {true}></Header>
        <Header isLoggedIn={false}></Header>
        <Login></Login>
        <p>Welcome</p>
        <p>React</p>
        
    </div>
    )
 }

 //component is a basic building block of react
 // each component will react  a single html node\
 //componennt  can be :
 //props => incomming data for an componennt
 //state =>data within a component
 // stateless =>if a component needs to store a data within a component 
//statefull =>if we dont need any data to be maintained
//classed based component
//functional component
