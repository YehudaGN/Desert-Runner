class Cactus {
    constructor (x, y, ctx, gameSpeed) {
        this.x = x;
        this.y = y;
        this.width = 108;
        this.height = 111;

        this.gameSpeed = gameSpeed;

        this.xDir = -gameSpeed;
        this.ctx = ctx;
        this.sprite = new Image ();
        this.sprite.src = "src/assets/Tiles/png/Objects/Cactus_1.png";
        
    }

    move () {
        this.x += this.xDir;
        this.xDir = -this.gameSpeed;
        this.draw();
      }

    draw () {
        // debugger
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height); 
    }
}

export default Cactus;