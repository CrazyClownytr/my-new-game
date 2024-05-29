import '../css/style.css';
import { Engine, DisplayMode, Vector, SolverStrategy, Scene, Keys } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Floor } from './floor.js';
import { BG } from './background.js';
import { Enemy } from './enemy.js';
import { Heart } from './heart.js';
import { Key } from './key.js';
import { UI } from './ui.js';
import { StartScene } from './scenes/begin.js';
import { EndScene } from './scenes/end.js';
import { DeathScene } from './scenes/respawn.js';

const options = {
    width: 1280,
    height: 720,
    maxFps: 60,
    displayMode: DisplayMode.FitScreen,
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: new Vector(0, 800),
    }
};

export class Game extends Engine {
    ui;
    score;
    mylabel;
    game;


    constructor() {
        super(options);
        this.showDebug(true);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("Start the game!");

        const startScene = new StartScene();
        this.add('start', startScene);
        this.goToScene('start');

        const endScene = new EndScene(); 
        this.add('end', endScene);

        const deathScene = new DeathScene();
        this.add('death', deathScene);
       
        this.add('game', this.createGameScene());
       
    }

    createGameScene() {
        const gameScene = new Scene();

        gameScene.onInitialize = (engine) => {
            const ui = new UI();
            gameScene.add(ui);

            const background = new BG(640, 360, 1280, 720);
            gameScene.add(background);

            const floor = new Floor(200, 620, 2400, 20);
            gameScene.add(floor);

            const player = new Player(200, 200, ui);
            gameScene.add(player);

            const startX = 800;
            const startY = 600;
            const spacingX = 60;
            const spacingY = 0;

            // Add enemies
            for (let i = 0; i < 8; i++) {
                const x = startX + i * spacingX;
                const y = startY - i * spacingY;
                const enemy = new Enemy(x, y, player, ui);
                gameScene.add(enemy);
            }

            const heart = new Heart(400, 300);
            gameScene.add(heart);

            const key = new Key(1100, 300);
            gameScene.add(key);
            
        };
        return gameScene;
    }
}

new Game();
