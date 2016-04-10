var io = require('socket.io-client');
var socket = io('http://localhost:8000');

var canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', handleMouseMove, false);
var ctx = canvas.getContext('2d');

var destination = {
  x: 0,
  y: 0
};

function handleMouseMove(mouse) {
  destination = screenToGameCoords(mouse.clientX, mouse.clientY);
}

function gameToScreenCoords(x, y) {
  return {
    x: 6*(x+100),
    y: 3*(-y+100)
  };
}

function screenToGameCoords(x, y) {
  return {
    x: x/6-100,
    y: -y/3+100
  };
}

socket.on('connect', function() {
  console.log('connected');
});

socket.on('gameState', function(data) {
  console.log(data);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < data.players.length; i++) {
    var p = data.players[i];
    var color = p.team === 0 ? '#FF0000' : '#00cc00';
    ctx.beginPath();
    var coords = gameToScreenCoords(p.x, p.y);
    ctx.arc(coords.x, coords.y, p.r, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
});

socket.on('disconnect', function() {
  console.log('disconnected');
});

function update() {
  socket.emit('destination', destination);
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
