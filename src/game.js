import Player from "./player.js";
import Obstacle from "./obstacle.js";

const playerIdle = new Image();
playerIdle.src = "./src/assets/Sprites/male/Idle__000.png";

let originalSpawnTimer = 200;
let spawnTimer = originalSpawnTimer;
let obstacles = [];

class Game {
    constructor (ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas; 

        this.gameSpeed = 3;
        this.gravity = 1;

        this.gameOver = false;
        this.score = 0;   
    }

    spawnPlatform () {
        // this should call spawnObstacle only after platform is spawned 
        // so spawn platform outside of canvas, place obs on random x of platform,
        // maybe spawn flying obs even if no platform?
    }

    spawnObstacle (player) {
        let size = this.randomInt(20, 65); // obs are squares, ill adjust when sprites are added
        let type = this.randomInt(0, 1);
        let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, 'red', this.ctx, this.gameSpeed);

        if (type == 1) {
            obstacle.y -= (player.originalHeight / 2) + 5;
        }
        obstacles.push(obstacle); // eventually my array will pre exist with predefined sizes and images so well just iterate rather than push
    }

    randomInt (min, max) { // currently temp until i get sprites working
        
                                    // no miniscule obs
        return Math.round(Math.random() * max) + min;
    }

    Start () {
        // debugger
        canvas.width = 1280;
        canvas.height = 800;

        // let player = new Player(25, 0, 50, 75, playerIdle, this.ctx);
        let player = new Player(100, 0, 50, 75, 'blue', this.ctx);
      
        this.update(player);
      }
    

    update (player) {
        // debugger
        if (this.gameOver) {
            let gameOverText = document.getElementById("game-over");
            gameOverText.innerText = "GAME OVER"
    
            return // i want to build a stop loop function and then build when key pressed, new game starts
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
            
            if ( // not working at the moment
                player.x < obs.x + obs.width &&
                player.x + player.width > obs.x &&
                player.y < obs.y + obs.height &&
                player.y + player.height > obs.y
              ) {
            // on reset func i can set everything back to the beginning
                this.gameOver = true;
            }
            // debugger
        
            obs.update();
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