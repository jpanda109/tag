'use strict';

let io = require('socket.io-client');
let socket = io('http://localhost:8000');

let canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', handleMouseMove, false);
let ctx = canvas.getContext('2d');

let destination = {
  x: 0,
  y: 0
};

function handleMouseMove(mouse) {
  destination = screenToGameCoords(mouse.clientX, mouse.clientY);
}

function gameToScreenCoords(x, y) {
  return {
    x: 3*(x+200),
    y: 3*(-y+100)
  };
}

function screenToGameCoords(x, y) {
  return {
    x: x/3-200,
    y: -y/3+100
  };
}

socket.on('connect', function() {
  console.log('connected');
});

socket.on('gameState', function(data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < data.players.length; i++) {
    let p = data.players[i];
    let color = p.team === 0 ? '#FF0000' : '#00cc00';
    ctx.beginPath();
    let coords = gameToScreenCoords(p.x, p.y);
    ctx.arc(coords.x, coords.y, p.r*3, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
  for (let i = 0; i < data.flags.length; i++) {
    let f = data.flags[i];
    let color = f.team === 0 ? '#FF0000' : '#00cc00';
    ctx.beginPath();
    let coords = gameToScreenCoords(f.x, f.y);
    ctx.arc(coords.x, coords.y, f.r*3, 0, 2*Math.PI);
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
