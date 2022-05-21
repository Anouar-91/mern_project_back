"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAuth = exports.checkUser = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _HttpException = require("../errors/HttpException.error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = require('../models/user.model');

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    console.log("token ok");

    _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null; // res.cookie("jwt", '', { maxAge: 1 })

        next();
      } else {
        let user = await User.findById(decodedToken.id);

        if (!user) {
          return next(new _HttpException.HttpException('Unauthorized', _HttpException.HttpStatus.UNAUTHORIZED));
        }

        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log("token invalid");
    res.locals.user = null;
    return next(new _HttpException.HttpException('Unauthorized', _HttpException.HttpStatus.UNAUTHORIZED));
    /*     next(); */
  }
};

exports.checkUser = checkUser;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('no token');
  }
};

exports.requireAuth = requireAuth;