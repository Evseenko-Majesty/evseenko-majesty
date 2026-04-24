// ============================================
// МАРШРУТЫ АВТОРИЗАЦИИ
// ============================================

import { Router } from 'express';
import { authUser } from '../controllers/authController.js';

const router = Router();

// POST /api/auth
router.post('/', authUser);

export default router;
