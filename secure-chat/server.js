const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const publicKeys = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('register publicKey', (publicKey) => {
    publicKeys[socket.id] = publicKey;
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete publicKeys[socket.id];
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
