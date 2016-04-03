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

class Game {
  constructor() {
    this.flags = [
      new GameUnit(-50, 0, 5, 0),
      new GameUnit(50, 0, 5, 1)
    ];
    this.players = [
      new GameUnit(0, 0, 5, 0)
    ];
  }

  update() {
  }

  move(playerId, deltaX, deltaY) {
    this.players[playerId].x += deltaX;
    this.players[playerId].y += deltaY;
  }
}

module.exports = Game;
