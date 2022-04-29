const User = require('../models/user.model')
const ObjectID = require("mongoose").Types.ObjectId;


export const getAllUsers = async (req, res) => {
    //allow to receive all users without password
    const users = await User.find().select('-password');
    res
        .status(200)
        .json(users)
}

export const getUserInfo = async (req, res) => {
    //if id exist in databse
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    await User.findById(req.params.id).select('-password')
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    await User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                bio: req.body.bio
            }
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }).select('-password').then((user) => {
            res.status(200).json(user)
        }).catch((err) => {
            res.status(500).json({ message: err })
        })
}

export const deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    await User.remove({
        _id: req.params.id
    }).exec()
    .then(() => {
        res.status(200).json({message: 'Successfully deleted !'})
    })
    .catch((err) => {
        res.status(500).json({message:err})
    })
}
export const follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) ) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    if (!ObjectID.isValid(req.body.idToFollow) ) {
        return res.status(400).send(`Id unknown : ${req.body.idToFollow}`)
    }
    //add to the follower list
    await User.findByIdAndUpdate(req.params.id, 
        { $addToSet : { following: req.body.idToFollow}},
        {new : true, upsert:true})
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((err) => {
            return res.status(500).json({message:err})
        })
    //add to the following list
    await User.findByIdAndUpdate(req.body.idToFollow,
        { $addToSet : { followers: req.params.id}},
        {new : true, upsert:true})
        .then((user) => {

        })
        .catch((err) => {
            return res.status(500).json({message:err})
        })

}
export const unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) ) {
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    }
    if (!ObjectID.isValid(req.body.idToUnFollow) ) {
        return res.status(400).send(`Id unknown : ${req.body.idToUnFollow}`)
    }
     //delete to the follower list
     await User.findByIdAndUpdate(req.params.id, 
        { $pull : { following: req.body.idToUnFollow}},
        {new : true, upsert:true})
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((err) => {
            return res.status(500).json({message:err})
        })
    //delete to the following list
    await User.findByIdAndUpdate(req.body.idToUnFollow,
        { $pull : { followers: req.params.id}},
        {new : true, upsert:true})
        .then((user) => {

        })
        .catch((err) => {
            return res.status(500).json({message:err})
        })

}