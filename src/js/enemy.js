import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Enemy extends Actor {
    sprite;
    speed;
    ui;
  

    constructor(x, y, player, ui) {
        super({
            pos: new Vector(x, y),
            width: Resources.Enemy.width / 4,
            height: Resources.Enemy.height / 4,
            collisionType: CollisionType.Active
        });
        this.speed= 30;
        this.player = player;
        this.ui = ui;
    }

    onInitialize(engine) {
        console.log("Enemy created");

        this.sprite = Resources.Enemy.toSprite();
        this.sprite.scale = new Vector(
            this.width / Resources.Enemy.width,
            this.height / Resources.Enemy.height
        );

        this.graphics.use(this.sprite);
        
    }

    onPreUpdate(engine) {
        const direction = this.player.pos.sub(this.pos).normalize();
        this.vel.x = direction.x * this.speed
    }
   
    hitByBullet() {
        console.log("ARRGHH I was hit by a bullet!")
        this.ui.updateScore(10);
        this.kill();
     }
}
