import { Router } from 'express';
import { authUser, createBrowserToken, bindToken, checkToken } from '../controllers/authController.js';



const router = Router();

router.post('/', authUser);
router.post('/browser-token', createBrowserToken);
router.post('/bind-token', bindToken);
router.get('/check-token', checkToken);

export default router;
