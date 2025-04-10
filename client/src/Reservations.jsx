import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reservations');
                setReservations(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Aktive reserveringer</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>Tittel</th>
                        <th>Forfatter</th>
                        <th>Lånernummer</th>
                        <th>Reservert dato</th>
                        <th>Klar dato</th>
                        <th>Hente frist</th>
                        <th>Hentet dato</th>
                        <th>Status</th>
                        <th>Dager på hylle</th>
                        <th>Hentenummer</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res) => (
                        <tr key={res.id}>
                            <td>{res.tittel}</td>
                            <td>{res.forfatter}</td>
                            <td>{res.lånernummer}</td>
                            <td>{res.reservert_dato}</td>
                            <td>{res.klar_dato}</td>
                            <td>{res.hente_frist}</td>
                            <td>{res.hentet_dato || "Ikke hentet"}</td>
                            <td>{res.status}</td>
                            <td>{res.dager_på_hylle ?? "-"}</td>
                            <td>{res.hentenummer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}