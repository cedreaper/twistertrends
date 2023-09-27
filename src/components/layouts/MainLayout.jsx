import React from 'react';
import '../../App.css';

const MainLayout = ({ children }) => {
    return (
        <div className="layout">
            <header>
                
            </header>

            <main>
                {children} 
            </main>

            <footer>
                
            </footer>
        </div>
    );
}

export default MainLayout;