import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
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

/*
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (path) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/${path}`);
      setData(res.data);
    } catch (err) {
      setData({ message: `Feil: ${err.response?.status || 'Ukjent feil'}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => fetchData('api/data')} disabled={isLoading}>
        /api/data
      </button>
      <button onClick={() => fetchData('random')} disabled={isLoading}>
        /random
      </button>
      
      {isLoading ? (
        <p>Laster...</p>
      ) : (
        <p>{data?.message || "Trykk på en knapp"}</p>
      )}
    </div>
  );
}
*/

export default App;