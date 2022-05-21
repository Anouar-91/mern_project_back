"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var AuthController = _interopRequireWildcard(require("../../controllers/auth.controller"));

var UserController = _interopRequireWildcard(require("../../controllers/user.controller"));

var UploadController = _interopRequireWildcard(require("../../controllers/upload.controller"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../../assets/uploads/profils`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let originalNameFile = file.originalname;
    let extension = originalNameFile.substring(originalNameFile.lastIndexOf('.') + 1);
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension);
  }
});
const upload = multer({
  storage: fileStorageEngine
});
const api = (0, _express.Router)(); //auth

api.post('/register', AuthController.signUp);
api.post('/login', AuthController.signIn);
api.get('/logout', AuthController.logout); //user

api.get('/', UserController.getAllUsers);
api.get('/:id', UserController.getUserInfo);
api.put('/:id', UserController.updateUser);
api.delete('/:id', UserController.deleteUser);
api.patch('/follow/:id', UserController.follow);
api.patch('/unfollow/:id', UserController.unfollow); //upload
//avant de passer à notre controlleur il va check notre file

api.post('/upload', upload.single("file"), UploadController.uploadProfil);
var _default = api;
exports.default = _default;