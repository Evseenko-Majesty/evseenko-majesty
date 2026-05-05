import { Router } from 'express';
import { getCities, searchCities } from '../controllers/cityController.js';
const router = Router();
router.get('/', getCities);
router.get('/search', searchCities);
export default router;
