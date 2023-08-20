const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const UrlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://mesto.react.nomoreparties.co',
  'https://api.mesto.react.nomoreparties.co',
  'http://mesto.react.nomoreparties.co',
  'https://api.mesto.react.nomoreparties.co',
  'localhost:3000',
  'localhost:3000',
];

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  UrlRegex,
  DEFAULT_ALLOWED_METHODS,
  allowedCors,
};
