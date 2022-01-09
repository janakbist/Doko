import React from 'react';
import { AppRouting } from './app.routing';
import { Provider } from 'react-redux';
import { store } from './../store';

// Provider is wrapper to wrap react application 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// aim of this file is to supply content to index.js
export const App = () => {
    return (
        <>
            <Provider store={store}>
                <AppRouting></AppRouting>
            </Provider>
            <ToastContainer></ToastContainer>
        </>
    )
}

// component is basic building block of react
// each component will return a single html node
// component can be
// stateful => if a component needs to store a data within a component
// stateless ==> if we dont need any data to be maintained
// class based component ==> statefull
// functional component ===> stateless

// props ==> incoming data for an component
// state ==> data within a component
