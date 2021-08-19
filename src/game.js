import Player from "./player.js";
import Bush from "./bush.js";
import Cactus from "./cactus_1.js";
import Crate from "./crate.js";
import Tree from "./tree.js";
import Cactus2 from "./cactus2.js";
import Bird from "./bird.js";
import Skeleton from "./skeleton.js";
import StoneBlock from "./stoneBlock.js";
import Cactus3 from "./cactus3.js";

let originalSpawnTimer = 200;
let spawnTimer = originalSpawnTimer;
let obstacles = [];
let platformHeight = 93;


class Game {
    constructor (ctx, canvas, hitboxes, character, gameSound, platform, background) {

        this.ctx = ctx;
        this.canvas = canvas; 

        
        this.ctx.textAlign = 'center';
        
        this.hitboxes = hitboxes;

        this.character = character;

        this.music = new Audio("./src/assets/audio/ES_Alleyways of Seoul - Josef Bel Habib.mp3");
        
        this.music.loop = true;
        this.music.volume = .15;

        this.gameSound = gameSound;

        this.platform = platform;
        this.background = background;

    }

    spawnObstacle (player) {
        
        let obstacle = this.newObs(player); 

        obstacles.push(obstacle); 
    }

    newObs (player) {
        // randomly call class for new obstacle
        let rand = this.randomInt(1, 9);
        if (rand === 1) {
            return new Bush(canvas.width + 131, canvas.height - platformHeight - 65 , this.ctx, this.gameSpeed);
        } else if (rand === 2) {
            return new Cactus(canvas.width + 88, canvas.height - platformHeight - 95, this.ctx, this.gameSpeed);
        } else if (rand === 3) {
            return new Crate(canvas.width + 65, canvas.height - platformHeight - 65, this.ctx, this.gameSpeed);
        } else if (rand === 4) {
            if (this.gameSpeed >= 22) {
                return new Tree(canvas.width + 180, canvas.height - platformHeight - 150, this.ctx, this.gameSpeed);
            } else {
                return new Cactus2(canvas.width + 70, canvas.height - platformHeight - 45, this.ctx, this.gameSpeed);
            }
        } else if (rand === 5 || rand === 9) {
            return new Bird((canvas.width + 146.8), canvas.height - platformHeight - 192 - (player.height / 2), this.ctx, this.gameSpeed);
        } else if (rand === 6) {
            return new Skeleton(canvas.width + 120, canvas.height - platformHeight - 51, this.ctx, this.gameSpeed)
        } else if (rand === 7) {
            return new StoneBlock(canvas.width + 101, canvas.height - platformHeight - 99, this.ctx, this.gameSpeed)
        } else if (rand === 8) {
            return new Cactus3(canvas.width + 86, canvas.height - platformHeight - 96, this.ctx, this.gameSpeed)
        }
    }

    

    randomInt(min, max){
        return Math.floor(min + Math.random() * (max - min + 1));
    }


    start () {


        if (this.gameSound) {
            this.music.play()
        }
        
        
        this.gameSpeed = 5;
        this.gameOver = false;
        this.score = 0;
        
        obstacles = [];
        spawnTimer = originalSpawnTimer;
       
        let player;
        if (this.character) {
             player = new Player(100, 0, 110, 100, this.ctx);
        } else {
             player = new Player(100, 0, 75, 100, this.ctx);
        }
       
        this.update(player);
       
    }

    endGame () {

        this.ctx.font = '48px fantasy';
        this.ctx.fillStyle = "red"
        this.ctx.shadowColor = '#8b0000';
        this.ctx.shadowBlur = 8
        this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);

        this.ctx.shadowColor = '#787878';
        this.ctx.fillStyle = "black"
        this.ctx.fillText("Click Restart", this.canvas.width / 2, this.canvas.height / 1.5);


        let start = document.getElementById("start")
        start.innerText = "Restart"
        start.classList.remove("none")


        this.music.pause();
        this.music.currentTime = 0;
        if (this.gameSound) {
            let over = new Audio("./src/assets/audio/game-over.wav");
            over.volume = .2
            over.play();
        }
    }
    

    update (player) {
        if (this.gameOver) {
            this.endGame()
            return 
        }
        
  

        let difficulty = document.getElementById("difficulty");

        if (this.gameSpeed < 15) {
            difficulty.innerText = "Difficulty: Easy"
        } else if (this.gameSpeed > 15 && this.gameSpeed < 20) {
            difficulty.innerText = "Difficulty: Medium"
        } else if (this.gameSpeed > 20 && this.gameSpeed < 30) {
            difficulty.innerText = "Difficulty: Hard"
        } else if (this.gameSpeed > 30 && this.gameSpeed < 40) {
            difficulty.innerText = "Difficulty: Impossible"
        } else if (this.gameSpeed > 40) {
            difficulty.innerText = "Why???"
        }

        requestAnimationFrame(this.update.bind(this, player));

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        
        spawnTimer--;
        if (spawnTimer <= 0) {
            this.spawnObstacle(player);

            spawnTimer = originalSpawnTimer - (this.gameSpeed * 10);
            
            if (spawnTimer < 50) { // max speed of frames per obs spawn
            spawnTimer = 50;
            }
        }

        //check collision
        // change check collision for bird class obs
        for (let i = 0; i < obstacles.length; i++) {
            let obs = obstacles[i];
   
            if ((obs.x + obs.width) < 0) {
                obstacles.splice(i, 1);
            }
         
            if (this.character) {

                if ( obs instanceof Bird &&
                    player.x < (obs.x + obs.width)  &&
                    (player.x + player.width) - 40 > obs.x && // generous hitbox
                    (player.y) < obs.y + obs.height - 45  &&
                   (player.y + player.height) > obs.y 
                  ) {
    
                    this.gameOver = true;
    
                } else if ( !(obs instanceof Bird) &&
                    player.x < (obs.x + obs.width) &&
                    (player.x + 15 + player.width) - 40 > obs.x && 
                    player.y < obs.y + 15 + obs.height &&
                    (player.y + player.height) > obs.y) {
              
                        this.gameOver = true;
                }

            } else {

                if ( obs instanceof Bird &&
                    player.x < (obs.x + obs.width)  &&
                    (player.x + player.width) - 10 > obs.x && 
                    (player.y) < obs.y + obs.height - 45  &&
                   (player.y + player.height) > obs.y 
                  ) {
    
                    this.gameOver = true;
    
                } else if ( !(obs instanceof Bird) &&
                    player.x < (obs.x + obs.width) &&
                    (player.x + player.width) - 10 > obs.x && 
                    player.y < obs.y + 15  + obs.height &&
                    (player.y + player.height) > obs.y) {
              
                        this.gameOver = true;
                }

            }

            



        
            obs.move(this.hitboxes);
        }
        
        player.animate(this.hitboxes, this.character, this.gameSound);

        this.score++;

        this.ctx.shadowColor = '#383838';
        this.ctx.shadowBlur = 2;
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px serif"
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, (this.canvas.height / 3) + 10);
    
        this.gameSpeed += 0.005;
    }

    
}

export default Game