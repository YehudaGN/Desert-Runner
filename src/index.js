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

    let keys = {};
    let debug = document.getElementById("debug");
    let hitboxes = false;
    debug.addEventListener('click', function(e) {
        hitboxes = !hitboxes
    })

    window.addEventListener('keydown', function (e) {
        keys[e.code] = true;
    });
    window.addEventListener('keyup', function (e) {
        keys[e.code] = false;
    });
    
    window.addEventListener('keydown', function (e) {
        
        if (keys["Escape"]) {    
            let g = new Game(ctx, canvas, hitboxes);
            g.start(ctx, canvas);
        }
    });
})

