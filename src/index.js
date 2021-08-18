import Game from "./game.js";

document.addEventListener("DOMContentLoaded", ()=> {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const scene = document.getElementById("scene");
    const sceneCTX = scene.getContext("2d");

    const background = new Image();
    background.src = "./src/assets/Tiles/png/BG.png";

    const platform = new Image();
    platform.src = "./src/assets/Tiles/png/Tile/platform.png"

    background.onload = () => {
        sceneCTX.drawImage(background, 0, 0, 1280, 800);
    }

    platform.onload = () => {
        sceneCTX.drawImage(platform, 0, canvas.height - 93, 1280, 93 )
    }



    let keys = {};


    let sound = document.getElementById("sound");
    let volume = document.getElementById("volume");

    let gameSound = true;
    sound.addEventListener("click", function(e) {
        gameSound = !gameSound
        if (!gameSound) {
            volume.src = "src/assets/volume/mute-icon.png"
        } else {
            volume.src = "src/assets/volume/volume-icon.png" 
        }
    })


    let debug = document.getElementById("debug");
    let hitboxes = false;
    debug.addEventListener('click', function(e) {
        hitboxes = !hitboxes
    })


    let male = document.getElementById("male");
    let female = document.getElementById("female");
    let character = 0;

    

    male.addEventListener('click', function(e) {
        character = 0;
    })

    female.addEventListener('click', function(e) {
        character = 1;
    })

    window.addEventListener('keydown', function (e) {
        keys[e.code] = true;
    });
    window.addEventListener('keyup', function (e) {
        keys[e.code] = false;
    });
    
    let start = document.getElementById("start") 
    start.addEventListener("click", function(e) {
        start.classList.add("none")
        let g = new Game(ctx, canvas, hitboxes, character, gameSound);
        g.start();
    })
})

