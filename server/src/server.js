var server  = require('http').createServer();
var io = require('socket.io')(server);

var Game = new require('./game.js');
var game = new Game();

var sockets = new Map();

io.on('connection', function(socket) {
  sockets.set(socket, sockets.size);
  console.log('new client');

  socket.on('destination', function(destination) {
    var i = sockets.get(socket);
    game.players[i].destination = destination;
  });

  socket.on('disconnect', function() {
    console.log('disconnect client');
    sockets.delete(socket);
  });
});

function update() {
  game.update(24/1000);
  var getInfo = function(unit) {
    return {
      'team': unit.team,
      'x': unit.x,
      'y': unit.y,
      'r': unit.radius
    };
  };
  var gameState = {
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
