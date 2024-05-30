import { DisplayMode, Scene, SolverStrategy, Vector } from "excalibur";
import { BG } from "../background";
import { Floor } from "../floor";
import { Player } from "../player";
import { Enemy } from "../enemy";
import { Heart } from "../heart";
import { Key } from "../key";
import { UI } from "../ui";

export class GameScene extends Scene {
    ui;
    player;
    enemies = [];
    heart;
    key;

    onInitialize(engine) {
        console.log("Level wordt aangemaakt");

        const background = new BG(640, 360, 1280, 720);
        this.add(background);

        const floor = new Floor(200, 620, 2400, 20);
        this.add(floor);

        this.ui = new UI();
        this.add(this.ui);

        this.player = new Player(200, 200, this.ui);
        this.add(this.player);

        const startX = 800;
        const startY = 600;
        const spacingX = 60;
        const spacingY = 0;

        // Add enemies
        for (let i = 0; i < 8; i++) {
            const x = startX + i * spacingX;
            const y = startY - i * spacingY;
            const enemy = new Enemy(x, y, this.player, this.ui);
            this.enemies.push(enemy);
            this.add(enemy);
        }

        this.heart = new Heart(400, 300);
        this.add(this.heart);

        this.key = new Key(1100, 300);
        this.add(this.key);

        this.player.on('playerdied', () => {
            this.engine.goToScene('death');
        });
    }

    onActivate(ctx) {
        console.log("De speler komt opnieuw in het level");

        this.clear(); // Clear the scene to remove old entities

        const background = new BG(640, 360, 1280, 720);
        this.add(background);

        const floor = new Floor(200, 620, 2400, 20);
        this.add(floor);

        this.ui = new UI();
        this.add(this.ui);

        const player = new Player(200, 200, this.ui);
        this.add(player);
        
        const startX = 800;
        const startY = 600;
        const spacingX = 60;
        const spacingY = 0;

        // Add enemies
        for (let i = 0; i < 8; i++) {
            const x = startX + i * spacingX;
            const y = startY - i * spacingY;
            const enemy = new Enemy(x, y, player, this.ui);
            this.add(enemy);
        }

        const heart = new Heart(400, 300);
        this.add(heart);

        const key = new Key(1100, 300);
        this.add(key);
    }

    onDeactivate(ctx) {
        console.log("We verlaten het level");
        this.clear(); 
    }
}
