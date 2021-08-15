import Player from "./player.js";

const playerIdle = new Image();
playerIdle.src = "./src/assets/Sprites/male/Idle__000.png";

// let initialSpawnTimer = 200;
// let spawnTimer = initialSpawnTimer;
// let obstacles = [];

class Game {
    constructor (ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas; 

        this.gameSpeed = 3;
        this.gravity = 1;

        // this.score = 0;   
    }

    Start () {
        canvas.width = 1280;
        canvas.height = 800;
      
        let player = new Player(25, 0, 50, 75, playerIdle, this.ctx);
        // let player = new Player(25, 0, 50, 75, 'blue', this.ctx);
      
        this.update(player);
      }
    
    update (player) {
        requestAnimationFrame(this.update.bind(this, player));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        player.animate();


        // this.gameSpeed += 0.003;
    }
}

export default Game