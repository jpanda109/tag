var server  = require('http').createServer();
var io = require('socket.io')(server);

var Game = new require('./game.js');
var game = new Game();

var sockets = [];

io.on('connection', function(socket) {
  sockets.push(socket);
  console.log('new client');

  socket.on('destination', function(destination) {
    console.log(destination);
  });

  socket.on('disconnect', function() {
    console.log('disconnect client');
    var i = sockets.indexOf(socket);
    if (i >= 0) {
      sockets.splice(i, 1);
    }
  });
});

function update() {
  game.update();
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
  for (var i = 0; i < sockets.length; i++) {
    sockets[i].emit('gameState', gameState);
  }
}

setInterval(update, 1000/24);

console.log('listening on port 8000');
server.listen(8000, 'localhost');
