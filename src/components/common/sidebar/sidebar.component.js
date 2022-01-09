import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.component.css'

export const SideBar = () => {
    return (
        <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add_product">Add Product</Link>
            <Link to="/view_product">View Product</Link>
            <Link to="/search_product">Search Product</Link>
            <Link to="/chat">Messages</Link>
        </>
    )
}
