export const HttpStatus = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
}

export class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
  }
}
