import React from 'react';
import "./navbar.scss"
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="top-navbar">
            <div className="logo">ALUMLINK</div>
            <ul className="nav-list">
                <li className="home"><Link to="/" className='a'>Home</Link></li>
                <li className="events"><Link to="/events" className='a'>Events</Link></li>
                <li className="about-us"><Link to="/about" className='a'>About Us</Link></li>
                <li className="account"><Link to="/login" className='a'>Account</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;
