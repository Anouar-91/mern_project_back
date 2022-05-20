"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtMiddleware = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _HttpException = require("../errors/HttpException.error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = require('../models/user.model');

const jwtMiddleware = (req, res, next) => {
  async (req, _res, next) => {
    console.log('jwtMiddleware');
    const token = req.cookies.jwt;

    if (token) {
      const {
        id
      } = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

      let user = await User.findById(id);

      if (!user) {
        return next(new _HttpException.HttpException('Unauthorized', _HttpException.HttpStatus.UNAUTHORIZED));
      }

      _express.request.user = user;
      next();
    } else {
      next(new _HttpException.HttpException('Unauthorized', _HttpException.HttpStatus.UNAUTHORIZED));
    }
  };
};

exports.jwtMiddleware = jwtMiddleware;