import React from 'react';
import {Link, NavLink } from 'react-router-dom';
import '../../App.css';

const MainLayout = ({ children }) => {
    return (
        <div className='layout'>
            <header>
            <nav className='navigation'>
                <ul>
                <li><NavLink to="/" exact activeclassnameame="active">Home</NavLink></li>
                <li><NavLink to="/about" activeclassname="active">About</NavLink></li>
                <li><NavLink to="/contact" activeclassname="active">Contact</NavLink></li>
                <li><NavLink to="/visualization/bar" activeclassname="active">Bar Graph</NavLink></li>
                <li><NavLink to="/visualization/line" activeclassname="active">Line Graph</NavLink></li>
                <li><NavLink to="/visualization/scatter" activeclassname="active">Scatter Plot</NavLink></li>
                <li><NavLink to="/visualization/histogram" activeclassname="active">Histogram</NavLink></li>
                <li><NavLink to="/visualization/explore" activeclassname="active">Explore</NavLink></li>
                </ul>
            </nav>
            </header>
            <main className='layout-body'>
                {children} 
            </main>
            <footer className='layout-footer'>
            <div className='footer-content'>
                    <p>&copy; 2023 Cedric Green All rights reserved</p>
                    <p><Link to='/terms'>Terms of Service</Link> | <Link to='/privacy'>Privacy Policy</Link></p>
                </div>
            </footer>
        </div>
    );
}

export default MainLayout;