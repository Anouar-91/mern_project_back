"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpStatus = exports.HttpException = void 0;
const HttpStatus = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};
exports.HttpStatus = HttpStatus;

class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

}

exports.HttpException = HttpException;