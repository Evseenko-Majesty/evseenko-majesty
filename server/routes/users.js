// ============================================
// МАРШРУТЫ ПОЛЬЗОВАТЕЛЕЙ
// ============================================

import { Router } from 'express';
import { updateCity } from '../controllers/userController.js';

const router = Router();

// PUT /api/users/city
router.put('/city', updateCity);

export default router;
