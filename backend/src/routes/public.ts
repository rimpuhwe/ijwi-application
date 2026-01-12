import { Router } from 'express';
import { getAllServices, getAllPortfolios } from '../controllers/publicController';

const router = Router();

router.get('/services', getAllServices);
router.get('/portfolios', getAllPortfolios);

export default router;
