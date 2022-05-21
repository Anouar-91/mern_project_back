"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./api/user.route"));

var _post = _interopRequireDefault(require("./api/post.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/api/user', _user.default);
router.use('/api/post', _post.default);
var _default = router;
exports.default = _default;