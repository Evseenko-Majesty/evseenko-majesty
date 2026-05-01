import { Router } from 'express';
import { checkPermission, checkPermissionsByType, updateUserRole, updateUserPosition, togglePermission, revokeAllPermissions } from '../controllers/permissionController.js';

const router = Router();

router.get('/check', checkPermission);
router.get('/check-type', checkPermissionsByType);
router.put('/role', updateUserRole);
router.put('/position', updateUserPosition);
router.post('/toggle', togglePermission);
router.post('/revoke-all', revokeAllPermissions);
export default router;
