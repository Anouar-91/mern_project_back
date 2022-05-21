"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = exports.logout = void 0;

var _express = require("express");

var _errors = require("../utils/errors.utils");

const User = require('../models/user.model');

const jwt = require('jsonwebtoken'); //equivalent de 3 jours


const maxAge = 3 * 24 * 60 * 60 * 1000; //function qui créer le token en fonction d'une clé de cryptage qu'on aura mis dans variable d'environnemment

const createToken = id => {
  return jwt.sign({
    id
  }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
};

const signUp = async (req, res) => {
  const {
    pseudo,
    email,
    password
  } = req.body;

  try {
    const user = await User.create({
      pseudo,
      email,
      password
    });
    res.status(201).send({
      user: user._id
    });
  } catch (err) {
    const errors = (0, _errors.signUpErrors)(err);
    return res.status(200).send({
      errors
    });
  }
};

exports.signUp = signUp;

const signIn = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    //check user exist and compare email with password
    const user = await User.login(email, password); //create token

    const token = createToken(user._id); //on retourne le token dans les cookies accessible seulement par le serveur

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: maxAge
    });
    res.status(200).json({
      user: user._id
    });
  } catch (err) {
    console.log(err);
    const errors = (0, _errors.signInErrors)(err);
    return res.status(200).send({
      errors
    });
  }
};

exports.signIn = signIn;

const logout = async (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1
  });
  res.status(200).json({
    message: "disconect"
  });
};

exports.logout = logout;