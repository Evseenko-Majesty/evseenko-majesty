import { Router } from 'express';
import { checkPermission, checkPermissionsByType, updateUserRole, updateUserPosition } from '../controllers/permissionController.js';

const router = Router();

router.get('/check', checkPermission);
router.get('/check-type', checkPermissionsByType);
router.put('/role', updateUserRole);
router.put('/position', updateUserPosition);

export default router;
