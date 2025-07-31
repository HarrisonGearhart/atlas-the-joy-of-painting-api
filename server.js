const express = require('express');
const cors = require('cors');

// Import route handlers
const episodesRoutes = require('./routes/episodeRoute');
const subjectsRoutes = require('./routes/subjectRoute');
const colorsRoutes = require('./routes/colorRoute');

const app = express();
const PORT = 3432;

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount API routes
app.use('/episodes', episodesRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/colors', colorsRoutes);

// Root route (basic health check)
app.get('/', (req, res) => {
  res.send('Welcome to the Joy of Painting API 🎨');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

