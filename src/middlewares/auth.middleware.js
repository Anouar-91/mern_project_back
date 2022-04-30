import jwt from 'jsonwebtoken';
const User = require('../models/user.model')
import { HttpException, HttpStatus } from '../errors/HttpException.error';


export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
 
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", '', { maxAge: 1 })
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        if (!user) {
          return next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
        }
        res.locals.user = user;
        next();
      }
    })
  }
  else {
    console.log('UNAUTORIZED')
    res.locals.user = null;
    next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
  }
}

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if(err){
        console.log(err);
      }else{
        console.log(decodedToken.id)
        next();
      }
    })
  }else{
    console.log('no token')
  }
}
