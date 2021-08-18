class Bird {
    constructor (x, y, ctx, gameSpeed) {
        this.x = x;
        this.y = y;
        this.width = 146.8;
        this.height = 192;
        this.frameX = 4;
        this.frameY = 0;

        this.gameSpeed = gameSpeed;

        this.xDir = -gameSpeed;
        this.ctx = ctx;
        this.sprite = new Image ();
        this.sprite.src = "src/assets/Tiles/png/Objects/bird.png";
        
    }

    move (hitboxes) {
        this.x += this.xDir;
        this.xDir = -this.gameSpeed;
        this.draw(hitboxes);
      }

    draw (hitboxes) {
        this.ctx.drawImage(this.sprite,
                            this.width * this.frameX, 
                            this.height * this.frameY,
                            this.width, 
                            this.height,
                            this.x,
                            this.y,
                            this.width,
                            this.height); 

        if (this.frameY === 0 && this.frameX === 0) {
            this.frameY = 3;
        } else if (this.frameY === 3 && this.frameX === 0) {
            this.frameY = 2;
        } else if (this.frameY === 2 && this.frameX === 0) {
            this.frameY = 1;
        } else if (this.frameY === 1 && this.frameX === 0) {
            this.frameY = 0;
        }

        this.frameX--
        if (this.frameX < 0) this.frameX = 4;

        // if toggle hitboxes is true
        if (hitboxes) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "1";
            this.ctx.strokeStyle = "black";
            this.ctx.rect(this.x, this.y + 15, this.width, this.height - 45);
            this.ctx.stroke();
        }

    }
    
}

export default Bird;