import { Sitting, Running } from "./playerStates";
export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 200;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.image = player;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxspeed = 10;
    this.weight = 1;
    this.states = [new Sitting(this), new Running(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input) {
    this.currentState.handleInput;
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxspeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxspeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20;
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
  }
  draw(context) {
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
  setState(state) {
    this.currentState = this.states[0];
    this.currentState.enter();
  }
}
