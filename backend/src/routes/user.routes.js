import { Router } from 'express';
import { getMe } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);
router.get('/me', getMe);

export default router;


