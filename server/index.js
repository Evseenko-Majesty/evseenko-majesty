const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
    console.log(`✅ API на порту ${port}`);
});
