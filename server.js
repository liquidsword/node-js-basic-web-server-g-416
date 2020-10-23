"use strict";

const http         = require('http');
const finalhandler = require('finalhandler');
const Router       = require('router');
const bodyParser   = require('body-parser');
const router = new Router();

let messages = [];

router.get('/', (request, response) => {
  // A good place to start!
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  response.end('Hello, World!');
});

router.post('/message', (request, response) => {
  let newMsg;

  response.setHeader('Content-Type', 'application/json; charset=UTF-8');

  if (!request.body.message) {
    response.statuscode = 400;
    response.statusMessage = 'No message provided';
    response.end();
    return;
  }

  newMsg = new MessageChannel(request.body.message);
  messages.push(newMsg);

  response.end(JSON.stringify(newMsg.id));
});

router.use(bodyParser.json());





const server = http.createServer((request, response) => {
  router(request, response, finalhandler(request, response));
});

exports.listen = function(port, callback) {
  server.listen(port, callback);
};

exports.close = function(callback) {
  server.close(callback);
};
