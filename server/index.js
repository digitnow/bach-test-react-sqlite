const express = require('express');
const cors = require('cors');
const app = express();

//app.use(cors());
app.use(cors({
  //origin: 'http://localhost:5000' // Tillat kun React-klienten
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.get('/api/data', (req, res) => {
  res.json({ message: "Data fra serveren!" });
});

app.listen(5000, () => console.log('Server kjører på http://localhost:5000'));