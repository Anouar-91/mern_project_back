import { request } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '../errors/HttpException.error';
const User = require('../models/user.model')

export const jwtMiddleware = (req, res, next) => {
  async (req, _res, next) => {
  console.log('jwtMiddleware')
  const token = req.cookies.jwt;
  if (token) {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET)
    let user = await User.findById(id);
    if (!user) {
      return next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
    }
    request.user = user;
    next();
  }else{
    next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
  }
}
  }

