import '../css/style.css';
import { Engine, DisplayMode, Vector, SolverStrategy } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Floor } from './floor.js';
import { BG } from './background.js';
import { Enemy } from './enemy.js';
import { Bullet } from './bullet.js';

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

        const bullet = new Bullet(player.pos.x + 10, player.pos.y);
        this.add(bullet);

        const enemy = new Enemy();
        this.add(enemy);

        const startX = 800;
        const startY = 600;
        const spacingX = 50;
        const spacingY = 50;

        // for loop
        for (let i = 0; i < 5; i++) {
            const x = startX + i * spacingX;
            const y = startY - i * spacingY;
            const enemy = new Enemy(x, y);
            this.add(enemy);
        }

    }
}

new Game();