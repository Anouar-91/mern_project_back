import express from 'express';
import res from 'express/lib/response';
import DefaultRouter from './routes';
const cookieParser = require("cookie-parser")
const {checkUser, requireAuth} = require('./middlewares/auth.middleware')


export function launch({ host, protocol, port }) {
  const application = express();
  require('dotenv').config({path:'./.env'})
  require('../database.js')
  // va nous permettre de lire les body des requetes entre autres
  application.use(express.json());
  // va nous permettre de lire les cookies
  application.use(cookieParser());
  // notre middleware de sécurité
  application.get('*',checkUser)
  //cest ce qui permet de loger un user lorsqu'il arrive sur le site
  application.get('/jwtid',requireAuth, (req, res)=> {
    res.status(200).send(res.locals.user._id)
  })


  application.use(DefaultRouter);

  application.listen(
    port,
    () => console.log(`Server started at ${protocol}://${host}:${port}`),
  );
}



/* require('dotenv').config({path:'./config/.env'})
 */



