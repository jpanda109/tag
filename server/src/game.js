'use strict';

class GameUnit {
  /**
  * @param {number} x - x position
  * @param {number} y - y position
  * @param {number} team - team ID (1 or 2)
  **/
  constructor(x, y, radius, team) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.team = team;
  }

  /**
  * @param {Circle} other - circle that you're checking collision with
  * @return {boolean} whether or not there's collision
  **/
  collides(other) {
    var dist = Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    return dist <= this.radius + other.radius;
  }
}

class Player extends GameUnit {
  constructor(x, y, team) {
    super(x, y, 10, team);
    this.destination = {
      x: x,
      y: y
    };
  }
}

class Game {
  constructor() {
    this.flags = [
      new GameUnit(-50, 0, 5, 0),
      new GameUnit(50, 0, 5, 1)
    ];
    this.players = [
      new Player(-50, 20, 0),
      new Player(50, 20, 1),
      new Player(-50, 0, 0),
      new Player(50, 0, 1),
      new Player(-50, -20, 0),
      new Player(50, -20, 1)
    ];
  }

  update(deltaTime) {
    // update positions
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      var dx = player.destination.x - player.x
          , dy = player.destination.y - player.y;
      if (dx === 0 && dy === 0) {
        continue;
      }
      var norm = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      dx /= norm;
      dy /= norm;
      dx *= deltaTime * 50;
      dy *= deltaTime * 50;
      if (Math.abs(dx) > Math.abs(player.destination.x - player.x)) {
        dx = player.destination.x - player.x;
      }
      if (Math.abs(dy) > Math.abs(player.destination.y - player.y)) {
        dy = player.destination.y - player.y;
      }
      player.x += dx;
      player.y += dy;
    }

    // update flag collisions

    // update player collisions
  }

}

module.exports = Game;
