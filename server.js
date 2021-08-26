const chalk = require('chalk');
const app = require('./app');
require('./config/db.js');
  
const express = require('express')
const http = require('http').createServer(app)
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};

const port = process.env.PORT || '3000';

/**
 * Event listener for HTTP server "listening" event.
 */

  // create a http server
const server = app.listen(port, () => {
 console.log(`server  is listening on port: ${port}`)
} )
// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})