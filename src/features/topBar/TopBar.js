import React, { useState, useEffect } from 'react';
import './TopBar.scss';

const MapList = () => {
    const [useLoading, setLoading] = useState(false);

    return (
        <div className="top-bar-container">
            <div className="top-bar">
                <img className="logo" src="https://www.ghgsat.com/wp-content/uploads/2017/07/logo-300x182.png" alt="GHGSat logo" />

                <nav className="main-nav">
                    <ul className="main-nav-items">
                        <li className="main-nav-item">
                            <a className="main-nav-link" href="/">Lorem</a>
                        </li>
                        <li className="main-nav-item">
                            <a className="main-nav-link" href="/">Ipsum</a>
                        </li>
                        <li className="main-nav-item">
                            <a className="main-nav-link cart-link" href="/">Cart <span className="cart-items-number">2</span></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default MapList
