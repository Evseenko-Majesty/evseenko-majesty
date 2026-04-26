// ============================================
// МАРШРУТЫ ПОЛЬЗОВАТЕЛЕЙ
// ============================================

import { Router } from 'express';
import { searchUsers } from '../controllers/userController.js';
import { searchUsers, getStaffUsers } from '../controllers/userController.js';

const router = Router();

// GET /api/users/search?query=...
router.get('/search', searchUsers);
// GET /api/users/staff
router.get('/staff', getStaffUsers);

export default router;
