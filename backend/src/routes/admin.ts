import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { 
  createService, updateService, deleteService, getAllServices,
  createPortfolio, updatePortfolio, deletePortfolio, getAllPortfolios
} from '../controllers/adminController';

const router = Router();

router.use(authenticateJWT);

// Services
router.get('/services', getAllServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Portfolios
router.get('/portfolios', getAllPortfolios);
router.post('/portfolios', createPortfolio);
router.put('/portfolios/:id', updatePortfolio);
router.delete('/portfolios/:id', deletePortfolio);

export default router;
