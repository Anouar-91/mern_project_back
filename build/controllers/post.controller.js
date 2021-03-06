"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.unlikePost = exports.readPost = exports.likePost = exports.editCommentPost = exports.deletePost = exports.deleteCommentPost = exports.createPost = exports.commentPost = void 0;

var _errors = require("../utils/errors.utils");

const Post = require('../models/post.model');

const User = require('../models/user.model');

const ObjectID = require("mongoose").Types.ObjectId;

const readPost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(200).json(err);
  }
};

exports.readPost = readPost;

const createPost = async (req, res, next) => {
  if (req.file != null) {
    console.log(req.file);

    try {
      if (req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg") {
        throw new Error('invalid file');
      }

      if (req.file.size > 500000) {
        throw new Error('max size');
      }
    } catch (err) {
      const errors = (0, _errors.uploadErrors)(err);
      return res.status(201).json({
        errors
      });
    }
  }

  const newPost = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file != null ? `http://localhost:8080/uploads/posts/${req.file.filename}` : "",
    video: req.body.video,
    likers: [],
    comments: []
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.createPost = createPost;

const updatePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id unknown : ${req.params.id}`);
  }

  try {
    const updatedRecord = {
      message: req.body.message
    };
    const newPost = await Post.findByIdAndUpdate(req.params.id, {
      $set: updatedRecord
    }, {
      new: true
    });
    res.status(200).send(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updatePost = updatePost;

const deletePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id unknown : ${req.params.id}`);
  }

  try {
    await Post.remove({
      _id: req.params.id
    }).exec();
    res.status(200).json({
      message: 'Successfully deleted !'
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};

exports.deletePost = deletePost;

const likePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id unknown : ${req.params.id}`);
  }

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        likers: req.body.id
      }
    }, {
      new: true
    });
    const user = await User.findByIdAndUpdate(req.body.id, {
      $addToSet: {
        likes: req.params.id
      }
    }, {
      new: true
    });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({
      err
    });
  }
};

exports.likePost = likePost;

const unlikePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id unknown : ${req.params.id}`);
  }

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $pull: {
        likers: req.body.id
      }
    }, {
      new: true
    });
    const user = await User.findByIdAndUpdate(req.body.id, {
      $pull: {
        likes: req.params.id
      }
    }, {
      new: true
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({
      err
    });
  }
};

exports.unlikePost = unlikePost;

const commentPost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id unknown : ${req.params.id}`);
  }

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          commenterPseudo: req.body.commenterPseudo,
          text: req.body.text,
          timestamp: new Date().getTime()
        }
      }
    }, {
      new: true
    }).then(data => res.send(data)).catch(err => res.status(500).send({
      message: err
    }));
  } catch (err) {
    res.status(400).send({
      err
    });
  }
};

exports.commentPost = commentPost;

const editCommentPost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id unknown : ${req.params.id}`);
  }

  try {
    //on r??cup??re le post concern??
    const post = await Post.findById(req.params.id); //on r??cup??re le commentaire concern??

    const theComment = await post.comments.find(comment => {
      return comment._id.equals(req.body.commentId);
    });
    console.log(theComment); //on change le text

    theComment.text = req.body.text; // on save les changements

    await post.save(); //on send le post concern??

    return res.send(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.editCommentPost = editCommentPost;

const deleteCommentPost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`Id unknown : ${req.params.id}`);
  }

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $pull: {
        comments: {
          _id: req.body.commentId
        }
      }
    }, {
      new: true
    }).then(newPost => {
      res.send(newPost);
    }).catch(err => {
      return res.status(400).send(err);
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.deleteCommentPost = deleteCommentPost;