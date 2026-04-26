import { Router } from 'express';
import { checkPermission, updateUserRole } from '../controllers/permissionController.js';

const router = Router();

router.get('/check', checkPermission);
router.put('/role', updateUserRole);

export default router;
