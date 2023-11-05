import React from 'react';
import "./navbar.scss"

const Navbar = () => {
    return (
        <div className="top-navbar">
            <div className="logo">ALUMLINK</div>
            <ul className="nav-list">
                <li className="home"><a href="#">Home</a></li>
                <li className="events"><a href="#">Events</a></li>
                <li className="about-us"><a href="#">About Us</a></li>
                <li className="account"><a href="#">Account</a></li>
            </ul>
        </div>
    );
};

export default Navbar;
