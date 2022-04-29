import { Router } from 'express';
import * as AuthController from '../../controllers/auth.controller';
import * as UserController from '../../controllers/user.controller';

const api = Router();

//auth
api.post('/register', AuthController.signUp);
api.post('/login', AuthController.signIn);
api.get('/logout', AuthController.logout);

//user
api.get('/', UserController.getAllUsers);
api.get('/:id', UserController.getUserInfo);
api.put('/:id', UserController.updateUser);
api.delete('/:id', UserController.deleteUser);
api.patch('/follow/:id', UserController.follow);
api.patch('/unfollow/:id', UserController.unfollow);

export default api;