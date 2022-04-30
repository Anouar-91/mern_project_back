const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type: String
        },
        video: {
            type: String
        },
        likers: {
            type: [String],
            required: true,
        },
        //la partie commentaire est une sous base de données
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number
                }
            ],
            required: true,
        }
    },
    {
        timestamps: true
    }
);

let Post = mongoose.model('post', PostSchema)
module.exports = Post;