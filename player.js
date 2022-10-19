export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 200;
    this.y = this.game.height - this.height;
    this.image = player;
    this.frameX = 0;
    this.frameY = 0;
  }
  update() {
    //this.x++;
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
}
