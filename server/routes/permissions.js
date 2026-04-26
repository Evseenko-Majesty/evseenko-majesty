import { Router } from 'express';
import { checkPermission, checkPermissionsByType, updateUserRole } from '../controllers/permissionController.js';

const router = Router();

router.get('/check', checkPermission);
router.get('/check-type', checkPermissionsByType);
router.put('/role', updateUserRole);

export default router;
