import { Router } from 'express';
import * as PostController from '../../controllers/post.controller';
const multer  = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, `${__dirname}/../../../client/public/uploads/post`)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let originalNameFile = file.originalname;
        let extension = originalNameFile.substring(originalNameFile.lastIndexOf('.') + 1); 
        cb(null, file.fieldname + '-' + uniqueSuffix + "."+ extension )
      }
});

const upload = multer({storage:fileStorageEngine})

const api = Router();


api.get('/', PostController.readPost);
api.post('/',upload.single('file'),  PostController.createPost);
api.put('/:id', PostController.updatePost);
api.delete('/:id', PostController.deletePost);
api.patch('/like-post/:id', PostController.likePost);
api.patch('/unlike-post/:id', PostController.unlikePost);

//comments
api.patch('/comment-post/:id', PostController.commentPost)
api.patch('/edit-comment-post/:id', PostController.editCommentPost)
api.patch('/delete-comment-post/:id', PostController.deleteCommentPost)



export default api;