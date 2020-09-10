import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Map from './features/map/Map';
import './assets/styles/app.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <Map />
            </header>
        </div>
    );
}

export default App;
