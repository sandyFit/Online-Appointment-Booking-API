import React from 'react';

import { Outlet } from 'react-router-dom'; // If using nested routes

function App() {
    return (
        <div>
            <Outlet /> {/* This allows child routes to render */}
        </div>
    );
}

export default App;
