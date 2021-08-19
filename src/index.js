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

    const title = new Image(); 
    title.src = "./src/assets/Title/Desert-Runner-8-16-2021.png";

    canvas.height = window.innerHeight / 1.8;
    canvas.width = window.innerWidth / 2;
    scene.height = window.innerHeight / 1.8;
    scene.width = window.innerWidth / 2;


    background.onload = () => {
        sceneCTX.drawImage(background, 0, 0, canvas.width, canvas.height);
        // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

    platform.onload = () => {
        sceneCTX.drawImage(platform, 0, canvas.height - 93, canvas.width, 93);
        // ctx.drawImage(platform, 0, canvas.height - 93, canvas.width, 93);
    }

    title.onload = () => {
        sceneCTX.drawImage(title, 20, 0, canvas.width - 20, canvas.height / 3);

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
        let g = new Game(ctx, canvas, hitboxes, character, gameSound, platform, background);
        g.start();
    })
})

