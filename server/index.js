// ============================================
// ТОЧКА ВХОДА — ЗАПУСК СЕРВЕРА
// ============================================

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import permissionRoutes from './routes/permissions.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Evseenko Majesty Server OK'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
