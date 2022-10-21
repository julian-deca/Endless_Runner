import Player from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 3;
      this.player = new Player(this);
      this.Background = new Background(this);
      this.input = new InputHandler();
    }
    update(deltatime) {
      this.Background.update();
      this.player.update(this.input.keys, deltatime);
    }
    draw(context) {
      this.Background.draw(context);

      this.player.draw(context);
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
    requestAnimationFrame(animate);
  }
  animate(0);
});
