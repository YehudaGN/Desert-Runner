import Player from "./player.js";
import Obstacle from "./obstacle.js";
import Bush from "./bush.js"
import Cactus from "./cactus_1.js"
// const playerIdle = new Image();
// playerIdle.src = "./src/assets/Sprites/male/Idle__000.png";

let originalSpawnTimer = 200;
let spawnTimer = originalSpawnTimer;
let obstacles = [];

class Game {
    constructor (ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas; 

        this.gameSpeed = 5;
        this.gravity = 1;

        this.gameOver = false;
        this.score = 0; 

        let bush = new Bush(canvas.width + 131, canvas.height - 74, this.ctx, this.gameSpeed);
        this.prebuiltObs = [bush];  
    }

    spawnPlatform () {
        // this should call spawnObstacle only after platform is spawned 
        // so spawn platform outside of canvas, place obs on random x of platform,
        // maybe spawn flying obs even if no platform?
    }

    spawnObstacle (player) {
        // let obstacle = new Bush(canvas.width + 131, canvas.height - 74, this.ctx, this.gameSpeed);
        let obstacle = this.newObs(); 


        // if (type === 1) { // for flying type obs
        //     obstacle.y -= (player.originalHeight / 2) + 5;
        // }
        obstacles.push(obstacle); // eventually my array will pre exist with predefined sizes and images so well just iterate rather than push
    }

    newObs () {
        // randomly call class for new obstacle
        let rand = this.randomInt(1, 2);
        debugger
        if (rand === 1) {
            return new Bush(canvas.width + 131, canvas.height - 65, this.ctx, this.gameSpeed);
        } else if (rand === 2) {
            return new Cactus(canvas.width + 88, canvas.height - 91, this.ctx, this.gameSpeed);
        }
        // height of flying obs needs to be players y / 2
        // return new Bush(canvas.width + 111, canvas.height - 64, this.ctx, this.gameSpeed);
    }

    

    randomInt(min, max){
        return Math.floor(min + Math.random() * (max - min + 1));
    }


    start () {
        // debugger
        canvas.width = 1280;
        canvas.height = 800;

        // let player = new Player(25, 0, 50, 75, playerIdle, this.ctx);
        let player = new Player(100, 0, 50, 75, this.ctx);
      
        this.update(player);
      }

      endGame () {
          let gameOverText = document.getElementById("game-over");
          gameOverText.innerText = "GAME OVER";
      }
    

    update (player) {
        // debugger
        if (this.gameOver) {
        // i want to build a stop loop function and then build when key pressed, new game starts
            this.endGame()
            return
        }
        requestAnimationFrame(this.update.bind(this, player));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        spawnTimer--;
        if (spawnTimer <= 0) {
            this.spawnObstacle(player);

            spawnTimer = originalSpawnTimer - (this.gameSpeed * 15);
            
            if (spawnTimer < 50) { // max speed of frames per obs spawn
            spawnTimer = 50;
            }
        }

        //check collision
        
        for (let i = 0; i < obstacles.length; i++) {
            let obs = obstacles[i];
            // debugger
            if ((obs.x + obs.width) < 0) {
                obstacles.splice(i, 1);
            }
            
            if ( // not working at the moment
                player.x < (obs.x + obs.width) &&
                (player.x + player.width) - 10 > obs.x && // generous hitbox
                player.y < obs.y + obs.height &&
               (player.y + player.height) > obs.y
              ) {
            // on reset func i can set everything back to the beginning
                this.gameOver = true;
            }
        
            obs.move();
        }
        
        
        player.animate();

        let scoreDisplay = document.getElementById("score-disp")
        this.score++;
        scoreDisplay.innerText = `Score: ${this.score}`;
        // c.font, c.fillText(text, coords) // draw dir on canvas
    
        this.gameSpeed += 0.005;
    }

    
}

export default Game