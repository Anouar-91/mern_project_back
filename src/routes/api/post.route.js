import { Router } from 'express';
import * as PostController from '../../controllers/post.controller';
import * as UploadController from '../../controllers/upload.controller';

const api = Router();


api.get('/', PostController.readPost);
api.post('/', PostController.createPost);
api.put('/:id', PostController.updatePost);
api.delete('/:id', PostController.deletePost);
api.patch('/like-post/:id', PostController.likePost);
api.patch('/unlike-post/:id', PostController.unlikePost);

//comments
api.patch('/comment-post/:id', PostController.commentPost)
api.patch('/edit-comment-post/:id', PostController.editCommentPost)
api.patch('/delete-comment-post/:id', PostController.deleteCommentPost)

//upload
api.post('/upload', UploadController.commentPost)

export default api;