import { Router } from 'express';
import * as PostController from '../../controllers/post.controller';

const api = Router();

//user
api.get('/', PostController.readPost);
api.post('/', PostController.createPost);
api.put('/:id', PostController.updatePost);
api.delete('/:id', PostController.deletePost);


export default api;