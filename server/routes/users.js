// ============================================
// МАРШРУТЫ ПОЛЬЗОВАТЕЛЕЙ
// ============================================

import { Router } from 'express';
import { updateCity, searchUsers } from '../controllers/userController.js';


const router = Router();

// PUT /api/users/city
router.put('/city', updateCity);
router.get('/search', searchUsers);

export default router;
