import Player from "./player.js";
import Obstacle from "./obstacle.js";
import Bush from "./bush.js";
import Cactus from "./cactus_1.js";
import Crate from "./crate.js";
import Tree from "./tree.js";
import Cactus2 from "./cactus2.js";
import Bird from "./bird.js";

let originalSpawnTimer = 200;
let spawnTimer = originalSpawnTimer;
let obstacles = [];


class Game {
    constructor (ctx, canvas, hitboxes) {
        this.ctx = ctx;
        this.canvas = canvas; 

        this.gameSpeed = 5;

        this.gameOver = false;

        this.score = 0; 
        this.highScore = 0;
        
        this.hitboxes = hitboxes;
    }

    spawnPlatform () { 
        // this should call spawnObstacle only after platform is spawned 
        // so spawn platform outside of canvas, place obs on random x of platform,
        // maybe spawn flying obs even if no platform?
    }

    spawnObstacle (player) {
        
        let obstacle = this.newObs(player); 

        obstacles.push(obstacle); 
    }

    newObs (player) {
        // randomly call class for new obstacle
        let rand = this.randomInt(1, 5);
        if (rand === 1) {
            return new Bush(canvas.width + 131, canvas.height - 65, this.ctx, this.gameSpeed);
        } else if (rand === 2) {
            return new Cactus(canvas.width + 88, canvas.height - 91, this.ctx, this.gameSpeed);
        } else if (rand === 3) {
            return new Crate(canvas.width + 65, canvas.height - 65, this.ctx, this.gameSpeed);
        } else if (rand === 4) {
            if (this.gameSpeed >= 15) {
                return new Tree(canvas.width + 180, canvas.height - 150, this.ctx, this.gameSpeed);
            } else {
                return new Cactus2(canvas.width + 70, canvas.height - 45, this.ctx, this.gameSpeed);
            }
        } else if (rand === 5) {
            // this birds hitbox is wonky
            return new Bird((canvas.width + 146.8), canvas.height - 192 - (player.height / 2), this.ctx, this.gameSpeed);
        }
    }

    

    randomInt(min, max){
        return Math.floor(min + Math.random() * (max - min + 1));
    }


    start (ctx, canvas) {

        this.ctx = ctx;
        this.canvas = canvas;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.gameSpeed = 5;
        this.gameOver = false;
        this.score = 0;
        // this.highScore = 0;
        obstacles = [];
        spawnTimer = originalSpawnTimer;

        // if (localStorage.getItem('highscore')) {
        //     highscore = localStorage.getItem('highscore');
        // }

        canvas.width = 1280;
        canvas.height = 800;
        let player = new Player(100, 0, 75, 100, this.ctx);
      
        this.update(player);
       
    }

    endGame () {
        let gameOverText = document.getElementById("game-over");
        gameOverText.innerText = "GAME OVER";
        
        let playAgain = document.getElementById("play-again")
        playAgain.innerText = "Press Esc To Restart"
    }
    

    update (player) {
        if (this.gameOver) {
            this.endGame()
            return 
        }
        let gameOverText = document.getElementById("game-over");
        gameOverText.innerText = '';

        let playAgain = document.getElementById("play-again")
        playAgain.innerText = ""

        let difficulty = document.getElementById("difficulty");

        if (this.gameSpeed < 15) {
            difficulty.innerText = "Difficulty: Easy"
        } else if (this.gameSpeed > 15 && this.gameSpeed < 20) {
            difficulty.innerText = "Difficulty: Medium"
        } else if (this.gameSpeed > 20 && this.gameSpeed < 25) {
            difficulty.innerText = "Difficulty: Hard"
        } else if (this.gameSpeed > 25 && this.gameSpeed < 30) {
            difficulty.innerText = "Difficulty: Impossible"
        } else if (this.gameSpeed > 30) {
            difficulty.innerText = "Why Are You Still Playing???"
        }

        requestAnimationFrame(this.update.bind(this, player));

        console.log(this.gameSpeed);

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
         
            if ( obs instanceof Bird &&
                player.x < (obs.x + obs.width)  &&
                (player.x + player.width) - 10 > obs.x && // generous hitbox
                (player.y) < obs.y + obs.height - 45  &&
               (player.y + player.height) > obs.y 
              ) {

                this.gameOver = true;

            } else if ( !(obs instanceof Bird) &&
                player.x < (obs.x + obs.width) &&
                (player.x + player.width) - 10 > obs.x && 
                player.y < obs.y + obs.height &&
                (player.y + player.height) > obs.y) {
          
                    this.gameOver = true;
            }



        
            obs.move(this.hitboxes);
        }
        
        
        player.animate(this.hitboxes);

        let scoreDisplay = document.getElementById("score-disp")
        this.score++;
        scoreDisplay.innerText = `Score: ${this.score}`;
    
        this.gameSpeed += 0.005;
    }

    
}

export default Game