import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Enemy extends Actor {
    sprite;
    speed;
  

    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Enemy.width / 4,
            height: Resources.Enemy.height / 4,
            collisionType: CollisionType.Active
        });
        this.speed = 30;
        this.gravity = 1000;
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

    onPreUpdate(engine, delta) {
       
        const player = engine.currentScene.actors.find(actor => actor instanceof Player);

        if (player) {
            const direction = player.pos.sub(this.pos).normalize();
            this.vel = direction.scale(this.speed);
        }
        this.vel.y += this.gravity * delta / 1000;
    }
   
    hitByBullet() {
        console.log("ARRGHH I was hit by a bullet!")
     }
}
