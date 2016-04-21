'use strict';

let server  = require('http').createServer();
let io = require('socket.io')(server);

let Game = new require('./game.js');
let game = new Game();

let sockets = new Map();

io.on('connection', function(socket) {
  sockets.set(socket, sockets.size);
  console.log('new client');

  socket.on('destination', function(destination) {
    let i = sockets.get(socket);
    game.players[i].destination = destination;
  });

  socket.on('disconnect', function() {
    console.log('disconnect client');
    sockets.delete(socket);
  });
});

function update() {
  game.update(24/1000);
  let getInfo = function(unit) {
    return {
      'team': unit.team,
      'x': unit.x,
      'y': unit.y,
      'r': unit.radius
    };
  };
  let gameState = {
    'players': game.players.map(getInfo),
    'flags': game.flags.map(getInfo)
  };
  sockets.forEach(function(i, s) {
    s.emit('gameState', gameState);
  });
}

setInterval(update, 1000/24);

console.log('listening on port 8000');
server.listen(8000, 'localhost');
