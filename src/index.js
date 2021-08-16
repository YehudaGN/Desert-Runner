import Game from "./game.js";

document.addEventListener("DOMContentLoaded", ()=> {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const scene = document.getElementById("scene");
    const sceneCTX = scene.getContext("2d");

    const background = new Image();
    background.src = "./src/assets/Tiles/png/BG.png";

    background.onload = () => {
        sceneCTX.drawImage(background, 0, 0, 1280, 800);
    }

    // const playerIdle = new Image();
    // playerIdle.src = "./src/assets/Sprites/male/Idle__000.png";

    // playerIdle.onload = () => {
    //     // debugger
    //     ctx.drawImage(playerIdle, 20, 800, 50, 75)
    // }

    // let keys = {};

    // document.addEventListener('keydown', function (e) {
    //     keys[e.code] = true;
    //   });
    //   document.addEventListener('keyup', function (e) {
    //     keys[e.code] = false;
    //   });

    //   if (keys['Space']) console.log("new game");
    //   debugger
    

    let g = new Game(ctx, canvas);
    if (!g.gameOver) {
        g.start();
    } 
    // console.log("start");
    if (g.gameOver) {
        console.log("game over bud");
    }

     //something like this might work
    // if g.gameOver = true, and key[code] = "Space", "ArrowUp", or "ArrowDOwn"
    // g = new Game, g.start?

    // console.log("games over bud");

})