import Player from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyfingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.lives = 3;
      this.groundMargin = 80;
      this.speed = 0;
      this.gameOver = false;
      this.maxSpeed = 3;
      this.player = new Player(this);
      this.Background = new Background(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.maxScore = 45;
      this.score = 0;
      this.fontColor = "black";
      this.time = 0;
      this.maxTime = 35000;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.maxParticles = 50;
    }
    update(deltatime) {
      this.time += deltatime;
      if (this.time > this.maxTime || this.lives <= 0) this.gameOver = true;
      this.Background.update();
      this.player.update(this.input.keys, deltatime);

      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltatime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltatime);
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }

      this.collisions.forEach((collision, index) => {
        collision.update(deltatime);
        if (collision.markedForDeletion) this.collisions.splice(index, 1);
      });
    }
    draw(context) {
      this.Background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.UI.draw(context);
      this.particles.forEach((particle, index) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision, index) => {
        collision.draw(context);
      });
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyfingEnemy(this));
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTIme = 0;
  function animate(timeStamp) {
    const deltatime = timeStamp - lastTIme;
    lastTIme = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltatime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
