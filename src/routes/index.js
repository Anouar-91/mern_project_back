import { Router } from 'express';
import UserRouter from './api/user.route';
import PostRouter from './api/post.route';
import { jwtMiddleware } from '../middlewares/jwt.middleware';

const router = Router();

router.use('/api/user',  UserRouter);
router.use('/api/post',  PostRouter);

export default router;
