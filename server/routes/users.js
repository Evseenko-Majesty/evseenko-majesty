// ============================================
// МАРШРУТЫ ПОЛЬЗОВАТЕЛЕЙ
// ============================================

import { Router } from 'express';
import { searchUsers } from '../controllers/userController.js';

const router = Router();

// GET /api/users/search?query=...
router.get('/search', searchUsers);

export default router;
