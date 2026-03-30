const express = require('express');
const cors = require('./middleware/cors');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors);
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Health check
app.get('/', (req, res) => res.send('OK'));
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.listen(port, () => {
    console.log(`✅ API сервер запущен на порту ${port}`);
});
