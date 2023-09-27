import React from 'react';
import {Link, NavLink } from 'react-router-dom';
import '../../App.css';

const MainLayout = ({ children }) => {
    return (
        <div className='layout'>
            <header>
            <nav className='navigation'>
                <ul>
                <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                </ul>
            </nav>
            </header>
            <main>
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