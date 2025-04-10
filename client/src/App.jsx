import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { useState } from 'react';
//import axios from 'axios';
import Reservations from './Reservations';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/reservations" element={<Reservations />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;