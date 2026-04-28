import { Router } from 'express';
import { searchUsers, getVisibleUsers } from '../controllers/userController.js';

const router = Router();

router.get('/search', searchUsers);
router.get('/visible', getVisibleUsers);

export default router;
