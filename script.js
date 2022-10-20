import Player from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltatime) {
      this.player.update(this.input.keys);
    }
    draw(context) {
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTIme = 0;
  function animate(timeStamp) {
    const deltatime = timeStamp - lastTIme;
    lastTIme = deltatime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltatime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
