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
    

    const g = new Game(ctx, canvas);

    g.Start();

})