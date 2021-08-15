
let keys = {};

document.addEventListener('keydown', function (e) {
    keys[e.code] = true;
  });
  document.addEventListener('keyup', function (e) {
    keys[e.code] = false;
  });

let gravity = 1;
class Player {
    constructor (x, y, width, height, sprite, ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sprite = sprite;

      this.ctx = ctx;
  
      this.yDir = 0;
      this.jumpPower = 15;
      this.originalHeight = height;
      this.jumping = true;
      this.jumpTimer = 0;
    }
  
    animate () {
      // Jump
      if (keys['ArrowUp']) {
        this.jump();
      } else {
        this.jumpTimer = 0;
      }
  
      if (keys['ArrowDown']) {
        this.height = this.originalHeight / 2;
      } else {
        this.height = this.originalHeight;
      }
  
      this.y += this.yDir;
  
      // Gravity
      if (this.y + this.height < canvas.height) {
        this.yDir += gravity;
        this.jumping = true;
      } else {
        this.yDir = 0;
        this.jumping = false;
        this.y = canvas.height - this.height;
      }
  
      this.draw();
    }
  
    jump () {
      if (!this.jumping && this.jumpTimer == 0) {
        this.jumpTimer = 1;
        this.yDir = -this.jumpPower;
      } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
        this.jumpTimer++;
        this.yDir = -this.jumpPower - (this.jumpTimer / 50);
      }
    }
  
    draw () {
    //   this.ctx.beginPath();
    //   this.ctx.fillStyle = this.color;
    //   this.ctx.fillRect(this.x, this.y, this.width, this.height);
    //   this.ctx.closePath();
        let that = this;
        this.sprite.onload = () => {
            // debugger
            that.ctx.drawImage(that.sprite, this.x, this.y)
        }
    }
  }

export default Player;