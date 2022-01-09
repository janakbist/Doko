import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './auth/login/login.component';
import { Register } from './auth/register/register.component';
import { Header } from './common/header/header.component';
import { MessageComponent } from './common/message/message.component';
import { SideBar } from './common/sidebar/sidebar.component';
import { AddProduct } from './products/addProduct/addProduct.component';
import { EditProduct } from './products/editProduct/editProduct.component';
import { SearchComponent } from './products/searchProduct/searchProduct.component';
import { ViewProduct } from './products/viewProduct/viewProduct.component';


const Home = (props) => {
    return <SearchComponent></SearchComponent>
}

const Dashboard = (props) => {
    return <p>Welcome!, Please use side navigation menu or contact system administrator for support</p>
}
const NotFound = () => {
    return <div>
        <p>Not Found</p>
        <img src="images/download.jpeg" width="600px" alt="notfound.png"></img>
    </div>
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={routeProps => (
        localStorage.getItem('token')
            ? <>
                <div className="nav_bar">
                    <Header isLoggedIn={true}></Header>
                </div>
                <div className="side_bar">
                    <SideBar isLoggedIn={true}></SideBar>
                </div>
                <div className="main_content">
                    <Component {...routeProps}></Component>
                </div>
            </>
            : <Redirect to="/"></Redirect>
    )} >

    </Route >

}

const PublicRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={routeProps => (
        <>
            <div className="nav_bar">
                <Header isLoggedIn={localStorage.getItem('token') ? true : false}></Header>
            </div>
            {/* <div className="side_bar">
                <SideBar isLoggedIn={localStorage.getItem('token') ? true : false} ></SideBar>
            </div> */}
            <div className="main_content">
                <Component {...routeProps}></Component>
            </div>
        </>
    )} >

    </Route >

}

export const AppRouting = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path="/" component={Login}></PublicRoute>
                <PublicRoute path="/register" component={Register}></PublicRoute>
                <PublicRoute exact path="/home" component={Home}></PublicRoute>
                <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
                <ProtectedRoute path="/add_product" component={AddProduct}></ProtectedRoute>
                <ProtectedRoute path="/view_product" component={ViewProduct}></ProtectedRoute>
                <ProtectedRoute path="/edit_product/:id" component={EditProduct}></ProtectedRoute>
                <ProtectedRoute path="/search_product" component={SearchComponent}></ProtectedRoute>
                <ProtectedRoute path="/chat" component={MessageComponent} />
                <PublicRoute component={NotFound}></PublicRoute>
            </Switch>
        </BrowserRouter>
    )
}

// summarize
// class based component statefull component
// routing==> objective SPA 
// library ==> react-router-dom
// BrowserRouter = wrapper
// Route ==> configuration builder
// it will supply props as history match and location to it's componenent

// exact ==>exact path match
// Switch==> one routing config at a time
// Link ==> Link is used to navigate on users click
// history.push('/path') navigate
// match >> params dynamic endpoint value