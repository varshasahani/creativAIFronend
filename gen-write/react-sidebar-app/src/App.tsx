import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
    return (
        <div className="app">
            <Sidebar />
            <main className="main-content">
                {/* Other components or content can go here */}
            </main>
        </div>
    );
};

export default App;