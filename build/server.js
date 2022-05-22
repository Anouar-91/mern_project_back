"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launch = launch;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bodyParser = require('body-parser');

const cookieParser = require("cookie-parser");

const {
  checkUser,
  requireAuth
} = require('./middlewares/auth.middleware');

const cors = require("cors");

function launch({
  host,
  protocol,
  port
}) {
  const application = (0, _express.default)();

  require('dotenv').config({
    path: './.env'
  });

  require('../database.js');
  /*   application.use(function( req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    }); */


  application.use(cors({
    origin: "https://magenta-frangollo-b9361a.netlify.app",
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    credentials: true
  }));
  application.use(cookieParser());
  application.use(_express.default.json()); // notre middleware de sécurité

  application.get('*', checkUser); //cest ce qui permet de loger un user lorsqu'il arrive sur le site

  application.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
  });
  application.use(_routes.default);
  application.use(_express.default.static('assets'));
  application.listen(port, () => console.log(`Server started at ${protocol}://${host}:${port}`));
}
/* require('dotenv').config({path:'./config/.env'})
 */