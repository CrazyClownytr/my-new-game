import '../css/style.css';
import { Engine, DisplayMode, Vector, SolverStrategy } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Floor } from './floor.js';
import { BG } from './background.js';

const options = {
    width: 1280,
    height: 720,
    maxFps: 60,
    displayMode: DisplayMode.FitScreen,
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: new Vector(0, 800),
    }
}

export class Game extends Engine {
    constructor() {
        super(options);
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");

        const background = new BG(640, 360, 1280, 720);
        this.add(background);

        const floor = new Floor(200, 620, 2400, 20);
        this.add(floor);

        const player = new Player(200, 200);
        this.add(player);
    }
}

new Game();