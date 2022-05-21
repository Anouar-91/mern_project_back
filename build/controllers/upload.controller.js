"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadProfil = void 0;

var _errors = require("../utils/errors.utils");

const User = require('../models/user.model');

const uploadProfil = async (req, res) => {
  try {
    if (req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg") {
      throw new Error('invalid file');
    }

    if (req.file.size > 5000000) {
      throw new Error('max size');
    }
  } catch (err) {
    const errors = (0, _errors.uploadErrors)(err);
    return res.status(201).json({
      errors
    });
  }

  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $set: {
        picture: `http://localhost:8080/uploads/profils/${req.file.filename}`
      }
    }, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }).then(user => {
      return res.send(user);
    }).catch(err => {
      return res.status(500).send(err);
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.uploadProfil = uploadProfil;