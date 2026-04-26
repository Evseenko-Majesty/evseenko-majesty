// ============================================
// МАРШРУТЫ ПРАВ
// ============================================

import { Router } from 'express';
import { updateUserRole } from '../controllers/permissionController.js';

const router = Router();

// PUT /api/permissions/role
router.put('/role', updateUserRole);

export default router;
