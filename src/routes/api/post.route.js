import { Router } from 'express';
import * as PostController from '../../controllers/post.controller';

const api = Router();

//user
api.get('/', PostController.readPost);
api.post('/', PostController.createPost);
api.put('/:id', PostController.updatePost);
api.delete('/:id', PostController.deletePost);
api.patch('/like-post/:id', PostController.likePost);
api.patch('/unlike-post/:id', PostController.unlikePost);


export default api;