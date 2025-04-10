const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Etabler en databaseforbindelse
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialiser databasen 
function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tittel TEXT NOT NULL,
        forfatter TEXT NOT NULL,
        lånernummer INTEGER NOT NULL,
        reservert_dato TEXT NOT NULL,
        klar_dato TEXT NOT NULL,
        hente_frist TEXT NOT NULL,
        hentet_dato TEXT,
        status TEXT NOT NULL,
        dager_på_hylle INTEGER,
        hentenummer INTEGER
    )`, () => { 
      db.get("SELECT COUNT(*) AS count FROM reservations", (err, row) => {
            if (row.count === 0) {
                db.run(`INSERT INTO reservations (tittel, forfatter, lånernummer, reservert_dato, klar_dato, hente_frist, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            ['Bok 1', 'Forfatter 1', 123, '2023-01-01', '2023-01-05', '2023-01-10', 'Aktiv']);
            }
      });
    });
}


// Bedre CORS-konfigurasjon
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET'],
  credentials: true
}));


// Legg til request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/api/data', (req, res) => {
  console.log("Ekstra logging for /api/data");
  res.json({ message: "Data fra serveren!" });
});

// Endepunkt for reservasjoner
app.get('/api/reservations', (req, res) => {
    db.all('SELECT * FROM reservations', [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// 404-håndtering
app.use((req, res) => {
  res.status(404).json({ message: "Fant ikke siden" });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
  console.log('Trykk Ctrl+C for å avslutte');
});