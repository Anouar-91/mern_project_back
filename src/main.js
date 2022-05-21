import { launch } from './server';
let port = process.env.PORT || 8080;
launch({
  host: 'localhost',
  protocol: 'http',
  port: port,
});
