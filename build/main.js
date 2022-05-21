"use strict";

var _server = require("./server");

let port = process.env.PORT || 8080;
(0, _server.launch)({
  host: 'localhost',
  protocol: 'http',
  port: port
});