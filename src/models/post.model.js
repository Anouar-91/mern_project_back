const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {   
        posterId : {
            type:String,
            required:true,
        },
        message: {
            type:String,
            trim:true,
            maxlength:500
        },
        picture: {
            type:String
        },
        video:{
            type:String
        },
        likes:{
            type:[
                {
                commenterId:String,
                commenterPseudo: String,
                text:String,
                timestamp:Number
            }
        ],
        required:true,
        },
    },
    {
        timestamps:true
    } 
);

let Post = mongoose.model('post', PostSchema)
module.exports = Post;