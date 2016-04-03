var io = require('socket.io-client');
var socket = io('http://localhost:8000');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
    ctx.arc(p.x+100, -p.y+100, p.r, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
});

socket.on('disconnect', function() {
  console.log('disconnected');
});
