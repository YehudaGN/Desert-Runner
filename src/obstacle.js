class Obstacle {
    constructor (x, y, width, height, color, ctx, gameSpeed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
  
      this.gameSpeed = gameSpeed
      this.xDir = -gameSpeed;
      this.ctx = ctx
    }
  
    update () {
      this.x += this.xDir;
      this.xDir = -this.gameSpeed;
      this.draw();
    }
  
    draw () {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.closePath();
    }
  }

  export default Obstacle