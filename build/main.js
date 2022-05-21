"use strict";

var _server = require("./server");

(0, _server.launch)({
  host: 'localhost',
  protocol: 'http',
  port: 8080
});