const User = require('../models/user.model')
import { uploadErrors} from '../utils/errors.utils'

export const uploadProfil = async(req, res) => {
    try{
        if(req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg"){
            throw new Error('invalid file')
        }
        if(req.file.size > 500000000){
            throw new Error('max size')
        }
    }
    catch(err){
        const errors = uploadErrors(err);
        return res.status(201).json(errors)
    }
    try{
             await User.findByIdAndUpdate(
            req.body.userId,
            {
                $set : { picture: `./uploads/profil/${req.file.filename}` }
            },
            {new:true, upsert:true, setDefaultsOnInsert:true}
            ).then((user) => {
                return res.send(user)
            }).catch((err) => {
                return res.status(500).send(err)
            })
    }
    catch(err){
        return res.status(500).send(err)
    }
    
}

