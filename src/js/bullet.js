import { Actor, CollisionType, Vector } from "excalibur";
import { Enemy } from "./enemy";
import { Resources } from "./resources";

export class Bullet extends Actor {
    constructor(x, y) {
        super({ x, y , width: 10, height: 10});
        this.on("collisionstart", (event) => this.onCollide(event));
        this.body.collisionType = CollisionType.Passive
        this.speed = 100;
    }

    onInitialize(engine) {
        console.log("shooting");
        // Initialiseer de sprite hier
        const bulletSprite = Resources.Bullet.toSprite();
        // Voeg de sprite toe aan de grafische componenten van de acteur
        this.graphics.add(bulletSprite);

        this.vel = new Vector(500 , 0);
    }

    onPreUpdate(engine) {
        
       // this.pos.x += this.speed * engine.deltaTime / 1000;
        
       
        if (this.pos.x > engine.drawWidth) {
            this.kill();
        }
    }

    onCollide(event) {
        if (event.other instanceof Enemy) {
            event.other.hitByBullet();
            this.kill(); 
        }
    }
}
