import { Router } from 'express';                   // Роутер Express
import { authUser } from '../controllers/authController.js';  // Логика

const router = Router();

// Когда приходит POST на /api/auth → вызываем authUser
router.post('/', authUser);

export default router;
