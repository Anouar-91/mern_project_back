import { Router } from 'express';
import * as AuthController from '../../controllers/auth.controller';
import * as UserController from '../../controllers/user.controller';
import * as UploadController from '../../controllers/upload.controller';
const multer  = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, `${__dirname}/../../../client/public/uploads/profil`)
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


//upload
//avant de passer à notre controlleur il va check notre file
api.post('/upload', upload.single("file"),  UploadController.uploadProfil)

export default api;