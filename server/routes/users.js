import { Router } from 'express';
import { searchUsers } from '../controllers/userController.js';

const router = Router();

router.get('/search', searchUsers);

export default router;
