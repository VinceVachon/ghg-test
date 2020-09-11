import React from 'react';
// import { Counter } from './features/counter/Counter';

import MapList from './sections/mapList/MapList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <Counter /> */}
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
