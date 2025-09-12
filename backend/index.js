const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Railway QR Backend Server Running' });
});

// QR route placeholder
app.get('/api/qr', (req, res) => {
  res.json({ message: 'QR endpoint working' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});