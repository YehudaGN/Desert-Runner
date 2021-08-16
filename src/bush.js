import Obstacle from "./obstacle";

// class Bush extends Obstacle {
class Bush {
    constructor (x, y, ctx, gameSpeed) {
        this.x = x;
        this.y = y;
        this.width = 131;
        this.height = 74;

        this.gameSpeed = gameSpeed;
        this.ctx = ctx;
        this.sprite = new Image ();
        this.sprite.src = "src/assets/Tiles/png/Objects/Bush_2.png";
        
    }

    move () {
        this.x += this.xDir;
        this.xDir = -this.gameSpeed;
        this.draw();
      }

    draw () {
        // debugger
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height) 
    }
}

export default Bush;