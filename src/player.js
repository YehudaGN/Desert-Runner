
let keys = {};
let platformHeight = 93;

document.addEventListener('keydown', function (e) {
    keys[e.code] = true;
  });
  document.addEventListener('keyup', function (e) {
    keys[e.code] = false;
  });

let gravity = 1;
class Player {
    constructor (x, y, width, height,ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      const playerIdle = new Image();
      playerIdle.src = "./src/assets/Sprites/male/Idle__000.png";

      this.sprite = playerIdle;

      this.ctx = ctx;
  
      this.yDir = 0;
      this.jumpPower = 12;
      this.originalHeight = height;
      this.jumping = false;
      this.jumpLength = 0;

      this.i = 0
      this.p = 0; // when p goes up a certain amount, i goes up one

      this.ducking = false;
    }
  
    animate (hitboxes, character) {
      // jump
      if (keys['Space']) {
        this.jump();
      } else {
        this.jumpLength = 0;
      }
  
      if (keys['ShiftLeft']) {
         this.ducking = true;
         gravity = 5;
         this.duck();

      } else {
        this.ducking = false;
        gravity = 1;
        this.height = this.originalHeight;
      }
  
      this.y += this.yDir;
  
      // gravity
      if ((this.y + this.height) < canvas.height - platformHeight ) {
        this.yDir += gravity;
        this.jumping = true;
      } else {
        this.yDir = 0; // this could bite me later if i want to set up gaps
        this.jumping = false;
        this.y = canvas.height - this.height - platformHeight;
      }
      this.draw(hitboxes, character);

      // when land from jump, puff of dust
    }

    duck () {
      // add limit to slide?
      this.height = this.originalHeight / 1.5;
      this.ducking = true;
    }
  
    jump () {
      if (!this.jumping && (this.jumpLength === 0) && !this.ducking) {
        this.jumpLength = 1;
        this.yDir = -this.jumpPower;
      } else if ((this.jumpLength > 0) && (this.jumpLength < 15)) {
        this.jumpLength++;
        this.yDir = -this.jumpPower;
      }
    }
  
    draw (hitboxes, character) {
      
      // for a male character --- will need to change logic when implementing multiple chars.
      if (character === 0) {  
        if (this.i > 9) this.i = 0;

        if (!this.ducking) {
          this.sprite.src = `./src/assets/Sprites/male/Run__00${this.i}.png`;
        } else {
          this.sprite.src = `./src/assets/Sprites/male/Slide__00${this.i}.png`;
        }
      } else {
        if (this.i > 7) this.i = 0;
        if (!this.ducking) {
          this.sprite.src = `./src/assets/Sprites/female/png/Run__00${this.i}.png`;
                              // /src/assets/Sprites/female/png/Run__000.png
        } else {
          if (this.i > 4) this.i = 0;
          this.sprite.src = `./src/assets/Sprites/female/png/Slide__00${this.i}.png`;
        }
      }

      this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)   
      
      if (this.p % 3 === 0) {
        this.i++
      }
      this.p++

      // visualize hitbox
      // debugger
      if (hitboxes && character) {
        // debugger
        this.ctx.beginPath();
        this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = "black";
        // debugger
        this.ctx.rect(this.x + 15, this.y, this.width - 30, this.height);
        this.ctx.stroke();
      } else if (hitboxes && !character){
        this.ctx.beginPath();
        this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = "black";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
      }

    }
  }

export default Player;


