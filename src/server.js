import express from 'express';
import DefaultRouter from './routes';
const bodyParser = require('body-parser');

const cookieParser = require("cookie-parser")
const { checkUser, requireAuth } = require('./middlewares/auth.middleware')
const cors = require("cors")


export function launch({ host, protocol, port }) {
  const application = express();
  require('dotenv').config({ path: './.env' })
  require('../database.js')

  application.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );
  application.use(cookieParser());

  application.use(express.json());

  // notre middleware de sécurité
  application.get('*', checkUser)
  //cest ce qui permet de loger un user lorsqu'il arrive sur le site
  application.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
  })

  application.use(DefaultRouter);
  application.use(express.static('assets'));

  application.listen(
     port,
    () => console.log(`Server started at ${protocol}://${host}:${port}`),
  );
}



/* require('dotenv').config({path:'./config/.env'})
 */



