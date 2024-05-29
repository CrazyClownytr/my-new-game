import '../css/style.css';
import { Engine, DisplayMode, Vector, SolverStrategy } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { StartScene } from './scenes/begin.js';
import { EndScene } from './scenes/end.js';
import { DeathScene } from './scenes/respawn.js';
import { GameScene } from './scenes/gamescene.js';

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
    constructor() {
        super(options);
        this.showDebug(true);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("Start the game!");
        const gameScene = new GameScene();
        this.add('game', gameScene);

        const startScene = new StartScene();
        this.add('start', startScene);
        this.goToScene('start');

        const deathScene = new DeathScene();
        this.add('death', deathScene);

        const endScene = new EndScene(); 
        this.add('end', endScene);

        
    }
}

new Game();
