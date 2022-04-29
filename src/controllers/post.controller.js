const Post = require('../models/post.model')
const User = require('../models/user.model')
const ObjectID = require("mongoose").Types.ObjectId;

export const readPost = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    }
   catch(err){
        res.status(200).json(err)
   }
}
export const createPost = async (req, res, next) => {
    const newPost = new Post({
        posterId: req.body.posterId, 
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });
    try {
        const post = await newPost.save();
        return res.status(201).json(post)
    }
    catch(err){
        return res.status(400).json(err)
    }
}
export const updatePost = (req, res, next) => {

}
export const deletePost = (req, res, next) => {

}
