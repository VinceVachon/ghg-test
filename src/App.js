import React from 'react';
// import { Counter } from './features/counter/Counter';

import TopBar from './features/topBar/TopBar';
import MapList from './sections/mapList/MapList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <Counter /> */}
                <TopBar />
            </header>
            <main>
                <div className="main-content">
                    <MapList />
                </div>
            </main>
        </div>
    );
}

export default App;
