const Post = require('../models/post.model')
const User = require('../models/user.model')
const ObjectID = require("mongoose").Types.ObjectId;

export const readPost = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    }
    catch (err) {
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
    catch (err) {
        return res.status(400).json(err)
    }
}
export const updatePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    try {
        const updatedRecord = {
            message: req.body.message
        }
        const newPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true }
        )
        res.status(200).send(newPost)
    }
    catch (err) {
        res.status(400).json(err)
    }



}
export const deletePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    try {
        await Post.remove({
            _id: req.params.id
        }).exec()
        res.status(200).json({ message: 'Successfully deleted !' })

    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
export const likePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { 
                new: true 
            }
        )
        const user = await User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            {
                new: true
            }
        );
        res.status(200).send(user)
    }
    catch (err) {
        res.status(400).send({ err })
    }
}
export const unlikePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { 
                new: true 
            }
        )
        const user = await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            {
                new: true
            }
        );
        res.status(200).send(user)
    }
    catch (err) {
        res.status(400).send({ err })
    }
}
