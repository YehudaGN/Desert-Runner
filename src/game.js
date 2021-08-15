import Player from "./player.js";
import Obstacle from "./obstacle.js";

const playerIdle = new Image();
playerIdle.src = "./src/assets/Sprites/male/Idle__000.png";

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;
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

    spawnObstacle (player) {
        let size = this.randomIntInRange(20, 70);
        let type = this.randomIntInRange(0, 1);
        let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, 'red', this.ctx, this.gameSpeed);

        if (type == 1) {
            obstacle.y -= player.originalHeight - 10;
        }
        obstacles.push(obstacle);
    }

    randomIntInRange (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    Start () {
        // debugger
        canvas.width = 1280;
        canvas.height = 800;

        // let player = new Player(25, 0, 50, 75, playerIdle, this.ctx);
        let player = new Player(100, 0, 50, 75, 'blue', this.ctx);
      
        // this.update(player, scoreDisplay);
        this.update(player);
      }
    

    update (player) {
        // debugger
        if (this.gameOver) {
            let gameOverText = document.getElementById("game-over");
            gameOverText.innerText = "GAME OVER"
            // debugger
            return // i want to build a stop loop function and then build when key pressed, new game starts
        }
        requestAnimationFrame(this.update.bind(this, player));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        spawnTimer--;
        if (spawnTimer <= 0) {
            this.spawnObstacle(player);
            console.log(obstacles);
            spawnTimer = initialSpawnTimer - (this.gameSpeed * 15);
            
            if (spawnTimer < 50) { // max speed of frames per obs spawn
            spawnTimer = 50;
            }
        }

        // spawn obstacles
        for (let i = 0; i < obstacles.length; i++) {
            // debugger
            let obs = obstacles[i];
            // debugger
            // if (obs.x + obs.width < 0) {
            //     // debugger
            // obstacles.slice(i, 1);
            // }
            
            if ( // not working at the moment
                player.x < obs.x + obs.width &&
                player.x + player.width > obs.x &&
                player.y < obs.y + obs.height &&
                player.y + player.height > obs.y
              ) {
            // on reset func i can set everything back to the beginning
                this.gameOver = true;
            }
        
            obs.update();
        }
        
        
        player.animate();

        let scoreDisplay = document.getElementById("score-disp")
        this.score++;
        scoreDisplay.innerText = `Score: ${this.score}`
    
        this.gameSpeed += 0.005;
    }

    
}

export default Game