import express from 'express';
import { getCurrentUser } from '@/controllers/user';

const userRouter = express.Router();

userRouter.get('/me', getCurrentUser);

export default userRouter;
