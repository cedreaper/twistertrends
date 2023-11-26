import React from 'react';
import '../../App.css';

const MainView = () => {
    return (
        <>
        <h1>TwisterTrends</h1>
        <h2><em>Oklahomas Climate-Tornado Investigation</em></h2>
        <div className="scene">
            <div className="nado-container">
                <img className="nado-logo" src="nado.png" alt="Tornado" />
            </div>
            <div className="sun-container">
                <img className="sun-logo" src="sun.png" alt="Sun" />
            </div>
        </div>
        </>
    );
}

export default MainView;