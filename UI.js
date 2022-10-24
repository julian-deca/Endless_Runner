export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
    this.livesImage = heart;
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    context.shadowBlur = 0;

    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    context.fillText("Score: " + this.game.score, 20, 50);

    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);

    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 28 * i + 20, 95, 25, 25);
    }

    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;

      if (this.game.score > this.game.maxScore) {
        context.fillText(
          "You Win, congrats!",
          this.game.width * 0.5,
          this.game.height * 0.5
        );
      } else {
        context.fillText(
          "You Lost, try again!",
          this.game.width * 0.5,
          this.game.height * 0.5
        );
        context.font = this.fontSize + "px " + this.fontFamily;

        context.fillText(
          "you needed " + this.game.maxScore + " Points",
          this.game.width * 0.5,
          this.game.height * 0.5 + 50
        );
      }
    }
    context.restore();
  }
}
