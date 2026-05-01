// ============================================
// МАРШРУТЫ ПРАВ
// ============================================

import { Router } from 'express';
import { 
  checkPermission, 
  checkPermissionsByType, 
  updateUserRole, 
  updateUserPosition, 
  togglePermission, 
  revokeAllPermissions 
} from '../controllers/permissionController.js';

const router = Router();

// GET /api/permissions/check?user_id=...&permission=...
router.get('/check', checkPermission);

// GET /api/permissions/check-type?user_id=...&type=...
router.get('/check-type', checkPermissionsByType);

// PUT /api/permissions/role
router.put('/role', updateUserRole);

// PUT /api/permissions/position
router.put('/position', updateUserPosition);

// POST /api/permissions/toggle
router.post('/toggle', togglePermission);

// POST /api/permissions/revoke-all
router.post('/revoke-all', revokeAllPermissions);

export default router;
