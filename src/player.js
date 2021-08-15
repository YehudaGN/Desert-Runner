
let keys = {};

document.addEventListener('keydown', function (e) {
    keys[e.code] = true;
  });
  document.addEventListener('keyup', function (e) {
    keys[e.code] = false;
  });

let gravity = 1;
class Player {
    // constructor (x, y, width, height, sprite, ctx) {
    constructor (x, y, width, height, color, ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      // this.sprite = sprite;
      this.color = color;

      this.ctx = ctx;
  
      this.yDir = 0;
      this.jumpPower = 15;
      this.originalHeight = height;
      this.jumping = true;
      this.jumpLength = 0;
    }
  
    animate () {
      // jump
      if (keys['ArrowUp']) {
        this.jump();
      } else {
        this.jumpLength = 0;
      }
  
      if (keys['ArrowDown']) {
         this.duck();
      } else {
        this.height = this.originalHeight;
      }
  
      this.y += this.yDir;
  
      // gravity
      if ((this.y + this.height) < canvas.height) {
        this.yDir += gravity;
        this.jumping = true;
      } else {
        this.yDir = 0;
        this.jumping = false;
        this.y = canvas.height - this.height;
      }
      // debugger
      this.draw();
    }

    duck () {
      this.height = this.originalHeight / 2;
      // add sprites!!
    }
  
    jump () {
      if (!this.jumping && (this.jumpLength === 0)) {
        this.jumpLength = 1;
        this.yDir = -this.jumpPower;
      } else if ((this.jumpLength > 0) && (this.jumpLength < 15)) {
        this.jumpLength++;
        // this.yDir = -this.jumpPower - (this.jumpLength / 50);
        this.yDir = -this.jumpPower;
      }
    }
  
    draw () {
      // debugger
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.closePath();
        // let that = this;
        // this.sprite.onload = () => {
        //     // debugger
        //     that.ctx.drawImage(that.sprite, this.x, this.y)
        // }
    }
  }

export default Player;