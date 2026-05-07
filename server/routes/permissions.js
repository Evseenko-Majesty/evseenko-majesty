import { Router } from 'express';
import { checkPermission } from '../controllers/permissionController.js';
const router = Router();
router.get('/check', checkPermission);
export default router;
